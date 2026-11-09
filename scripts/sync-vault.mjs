import { copyFile, lstat, mkdir, open, readdir, readFile, realpath, rm, stat, utimes } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORY_DEFINITIONS } from '../src/lib/category-definitions.ts';
import { fillFrontmatter } from './vault-frontmatter.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(repoRoot, 'src/content/posts');
const attachmentDirName = '_Attachments';
const attachmentOutputName = '_attachments';
const vaultArgument = process.argv[2];

if (!vaultArgument) {
	throw new Error('Usage: pnpm sync:vault <vaultDir>');
}

const vaultDir = await realpath(path.resolve(vaultArgument));
const categoryNames = new Set(CATEGORY_DEFINITIONS.map(({ name }) => name));

if (
	vaultDir === outputDir ||
	outputDir.startsWith(`${vaultDir}${path.sep}`) ||
	vaultDir.startsWith(`${outputDir}${path.sep}`)
) {
	throw new Error('The vault directory cannot overlap a generated content directory.');
}

async function walkMarkdown(directory, relativeDirectory = '') {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
		if (entry.isDirectory()) {
			if (entry.name === attachmentDirName || entry.name === '.obsidian' || entry.name === '.trash') {
				continue;
			}
			files.push(...(await walkMarkdown(path.join(directory, entry.name), path.join(relativeDirectory, entry.name))));
		} else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md') && !entry.name.toLowerCase().endsWith('.excalidraw.md')) {
			files.push({
				absolutePath: path.join(directory, entry.name),
				relativePath: path.join(relativeDirectory, entry.name),
			});
		}
	}

	return files;
}

function readFrontmatter(source, relativePath) {
	const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);

	if (!match) {
		if (/^publish\s*:\s*true\s*$/m.test(source)) {
			throw new Error(`${relativePath}: publish:true is missing valid YAML frontmatter.`);
		}
		return null;
	}

	const frontmatter = match[1];
	const published = /^publish\s*:\s*(?:true|"true"|'true')\s*$/m.test(frontmatter);

	return { body: source.slice(match[0].length), frontmatter, published };
}

function validatePublishedNote(source, relativePath, frontmatter, body) {
	const dateMatch = /^date\s*:\s*(?:"([^"]*)"|'([^']*)'|(.+))\s*$/m.exec(frontmatter);
	const date = dateMatch ? (dateMatch[1] ?? dateMatch[2] ?? dateMatch[3]).trim() : '';
	if (!/^\d{4}-\d{2}-\d{2}(?:$|T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)$/.test(date)) {
		throw new Error(`${relativePath}: published notes require a date in YYYY-MM-DD or ISO datetime format.`);
	}

	let inFence = false;
	let hasH1 = false;
	for (const line of body.split(/\r?\n/)) {
		if (/^\s*(`{3,}|~{3,})/.test(line)) {
			inFence = !inFence;
			continue;
		}
		if (!inFence && /^#\s+\S/.test(line)) {
			hasH1 = true;
			break;
		}
	}

	if (!hasH1) {
		throw new Error(`${relativePath}: published notes require an H1 heading.`);
	}
}

const markdownFiles = await walkMarkdown(vaultDir);
const posts = [];
const attachments = new Map();
const outputPaths = new Set();
let filledCount = 0;

for (const file of markdownFiles) {
	const fileStats = await stat(file.absolutePath);
	const source = await readFile(file.absolutePath, 'utf8');
	const birthtime = Number.isFinite(fileStats.birthtimeMs) && fileStats.birthtimeMs !== 0
		? fileStats.birthtime
		: fileStats.mtime;
	const { updated, added } = fillFrontmatter(source, birthtime);
	if (updated === source) continue;

	const fileHandle = await open(file.absolutePath, 'r+');
	try {
		await fileHandle.truncate(0);
		await fileHandle.writeFile(updated, 'utf8');
	} finally {
		await fileHandle.close();
	}
	await utimes(file.absolutePath, fileStats.atime, fileStats.mtime);
	if (fileStats.atimeMs % 1 !== 0 || fileStats.mtimeMs % 1 !== 0) {
		await utimes(file.absolutePath, fileStats.atimeMs / 1000, fileStats.mtimeMs / 1000);
	}
	filledCount += 1;
	console.log(`Filled frontmatter (${added.join(', ')}): ${file.relativePath.split(path.sep).join('/')}`);
}

if (filledCount > 0) {
	console.log(`Filled frontmatter for ${filledCount} notes.`);
}

for (const file of markdownFiles) {
	const relativePath = file.relativePath.split(path.sep).join('/');
	const source = await readFile(file.absolutePath, 'utf8');
	const parsed = readFrontmatter(source, relativePath);
	const segments = relativePath.split('/');
	const folderDepth = segments.length - 1;
	const primary = segments[0];
	const body = parsed?.body ?? source;
	const outputPath = path.join(...segments);

	if (parsed?.published) {
		if (folderDepth < 1 || folderDepth > 2) {
			throw new Error(`${relativePath}: published notes must be in <L1>/<L2?>/<file>.md.`);
		}

		if (!categoryNames.has(primary)) {
			throw new Error(`${relativePath}: L1 category "${primary}" is missing from src/lib/categories.ts.`);
		}

		validatePublishedNote(source, relativePath, parsed.frontmatter, body);

		if (outputPaths.has(outputPath)) {
			throw new Error(`${relativePath}: duplicate generated post path "${outputPath}".`);
		}
		outputPaths.add(outputPath);
		posts.push({ sourcePath: file.absolutePath, outputPath, relativePath });

		for (const match of body.matchAll(/!\[\[([^\]\r\n]+)\]\]/g)) {
			const target = match[1].split('|', 1)[0].trim().split('#', 1)[0].trim();
			if (!target) throw new Error(`${relativePath}: empty embedded attachment reference.`);
			const basename = path.posix.basename(target.replaceAll('\\', '/'));
			const sourcePath = path.join(vaultDir, attachmentDirName, basename);
			const previous = attachments.get(basename);

			if (previous && previous !== sourcePath) {
				throw new Error(`${relativePath}: duplicate embedded attachment basename "${basename}".`);
			}
			attachments.set(basename, sourcePath);
		}
		continue;
	}
	continue;
}

if (posts.length === 0) {
	throw new Error(`No publish:true Markdown notes found in ${vaultDir}.`);
}

for (const [basename, sourcePath] of attachments) {
	try {
		if (!(await lstat(sourcePath)).isFile()) throw new Error('not a file');
	} catch {
		throw new Error(`Missing embedded attachment: ${path.join(attachmentDirName, basename)}`);
	}
}

try {
	if ((await lstat(outputDir)).isSymbolicLink()) {
		throw new Error(`${outputDir} must not be a symbolic link.`);
	}
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}

await rm(outputDir, { recursive: true, force: true });
await rm(path.join(repoRoot, 'src/content/drafts'), { recursive: true, force: true });

await mkdir(path.join(outputDir, attachmentOutputName), { recursive: true });

async function copyPreservingMtime(sourcePath, destinationPath) {
	await copyFile(sourcePath, destinationPath);
	const sourceStats = await stat(sourcePath);
	await utimes(destinationPath, sourceStats.atime, sourceStats.mtime);
}

for (const post of posts) {
	const destination = path.join(outputDir, post.outputPath);
	await mkdir(path.dirname(destination), { recursive: true });
	await copyPreservingMtime(post.sourcePath, destination);
}
for (const [basename, sourcePath] of attachments) {
	await copyPreservingMtime(sourcePath, path.join(outputDir, attachmentOutputName, basename));
}

console.log(`Synced ${posts.length} published posts and ${attachments.size} attachments from ${vaultDir}.`);

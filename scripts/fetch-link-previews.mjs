import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { extractLinkUrls } from '../src/lib/markdown/link-preview-urls.mjs';

const root = path.resolve(process.cwd());
const postsRoot = path.join(root, 'src/content/posts');
const dataPath = path.join(root, 'src/data/link-previews.json');
const imageRoot = path.join(root, 'public/link-previews');

async function files(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const output = [];
	for (const entry of entries) {
		const file = path.join(directory, entry.name);
		if (entry.isDirectory()) output.push(...(await files(file)));
		else if (entry.name.endsWith('.md')) output.push(file);
	}
	return output;
}

const urls = new Set();
for (const file of await files(postsRoot)) {
	const source = await readFile(file, 'utf8');
	for (const url of extractLinkUrls(source)) urls.add(url);
}

const previews = {};
await mkdir(imageRoot, { recursive: true });
for (const url of urls) {
	const hash = createHash('sha256').update(url).digest('hex').slice(0, 16);
	try {
		const response = await fetch(url, { headers: { 'user-agent': 'GinosBlogLinkPreview/1.0' } });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const html = await response.text();
		const meta = (property) => html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)`, 'i'))?.[1]?.trim();
		const title = meta('og:title') || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || new URL(url).hostname;
		const description = meta('og:description') || meta('description') || '';
		const imageUrl = meta('og:image');
		const entry = { title, description, image: null };
		if (imageUrl) {
			const imageResponse = await fetch(new URL(imageUrl, url), { headers: { 'user-agent': 'GinosBlogLinkPreview/1.0' } });
			if (imageResponse.ok) {
				const buffer = Buffer.from(await imageResponse.arrayBuffer());
				const output = path.join(imageRoot, `${hash}.webp`);
				await sharp(buffer).resize(640, 360, { fit: 'cover' }).webp({ quality: 82 }).toFile(output);
				entry.image = `/link-previews/${hash}.webp`;
			}
		}
		previews[url] = entry;
		console.log(`Fetched ${url}`);
	} catch (error) {
		previews[url] = { title: new URL(url).hostname, description: '', image: null, error: String(error.message || error) };
		console.warn(`Failed ${url}: ${error.message || error}`);
	}
}

await writeFile(dataPath, `${JSON.stringify(previews, null, 2)}\n`);
console.log(`Wrote ${Object.keys(previews).length} link previews.`);

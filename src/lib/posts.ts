import { getCollection, type CollectionEntry } from 'astro:content';
import GithubSlugger from 'github-slugger';
import { CATEGORIES } from './categories';

export type PostEntry = CollectionEntry<'posts'>;

export interface Post {
	entry: PostEntry;
	id: string;
	slug: string;
	href: string;
	primary: string;
	primarySlug: string;
	secondary?: string;
	title: string;
	date: string;
	displayDate: string;
	updated?: string;
	displayUpdated?: string;
	description: string;
	words: number;
	readTime: number;
	titleImage?: string;
}

function withoutCodeAndMath(source: string) {
	let inFence = false;
	const lines = source.split(/\r?\n/);
	const proseLines = lines.filter((line) => {
		if (/^\s*(`{3,}|~{3,})/.test(line)) {
			inFence = !inFence;
			return false;
		}
		return !inFence;
	});

	return proseLines
		.join('\n')
		.replace(/\$\$[\s\S]*?\$\$/g, ' ')
		.replace(/(?<!\\)\$(?!\$)[^\n]*?(?<!\\)\$(?!\$)/g, ' ')
		.replace(/%%[\s\S]*?%%/g, ' ');
}

const textColors = new Set([
	'blue',
	'cyan',
	'green',
	'yellow',
	'red',
	'purple',
	'gray',
	'orange',
	'maimai-expert',
	'maimai-master',
	'maimai-remaster',
	'maimai-utage',
]);

function isAsciiPunctuation(character: string | undefined) {
	if (!character) return false;
	const code = character.charCodeAt(0);
	return (code >= 33 && code <= 47) || (code >= 58 && code <= 64) || (code >= 91 && code <= 96) || (code >= 123 && code <= 126);
}

function findClosingBrace(source: string, start: number) {
	let depth = 1;
	for (let index = start + 1; index < source.length; index += 1) {
		if (source[index] === '\\' && isAsciiPunctuation(source[index + 1])) {
			index += 1;
			continue;
		}
		if (source[index] === '{') depth += 1;
		if (source[index] === '}' && --depth === 0) return index;
	}
	return -1;
}

function stripRubyColorSyntax(source: string): string {
	let result = '';
	for (let index = 0; index < source.length; ) {
		if (source[index] === '`') {
			let delimiterEnd = index + 1;
			while (source[delimiterEnd] === '`') delimiterEnd += 1;
			const delimiter = source.slice(index, delimiterEnd);
			const closing = source.indexOf(delimiter, delimiterEnd);
			if (closing >= 0) {
				const end = closing + delimiter.length;
				result += source.slice(index, end);
				index = end;
				continue;
			}
		}

		if (source[index] === '\\' && isAsciiPunctuation(source[index + 1])) {
			result += source.slice(index, index + 2);
			index += 2;
			continue;
		}

		if (source[index] === '{') {
			const closing = findClosingBrace(source, index);
			if (closing >= 0) {
				const color = /^\(([^)]+)\)/.exec(source.slice(closing + 1));
				if (color && textColors.has(color[1])) {
					result += stripRubyColorSyntax(source.slice(index + 1, closing));
					index = closing + 1 + color[0].length;
					continue;
				}

				let separator = -1;
				for (let cursor = index + 1; cursor < closing; cursor += 1) {
					if (source[cursor] === '\\' && isAsciiPunctuation(source[cursor + 1])) {
						cursor += 1;
						continue;
					}
					if (source[cursor] === '|') {
						separator = cursor;
						break;
					}
				}
				if (separator > index + 1 && separator < closing - 1) {
					result += source.slice(index + 1, separator);
					index = closing + 1;
					continue;
				}
			}
		}

		result += source[index];
		index += 1;
	}
	return result;
}

function plainText(source: string) {
	const markdownText = source
		.replace(/!\[\[[^\]]*\]\]/g, ' ')
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g, (_match, target: string, alias?: string) =>
			alias ?? target.replace(/\.md$/i, ''),
		)
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]*>/g, ' ')
		.replace(/^\s*>+\s?/gm, '')
		.replace(/^\s{0,3}#{1,6}\s+/gm, '')
		.replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
		.replace(/^\s*\|?[\s:|-]+\|?\s*$/gm, ' ');

	return stripRubyColorSyntax(markdownText)
		.replace(/`([^`]*)`/g, '$1')
		.replace(/(\*\*|__|~~|==|[*_])/g, '')
		.replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

function truncate(text: string, limit: number) {
	const characters = Array.from(text);
	return characters.length > limit ? `${characters.slice(0, limit).join('')}…` : text;
}

function getFallbackDescription(body: string) {
	for (const block of withoutCodeAndMath(body).split(/\n\s*\n/)) {
		const candidate = block.trim();
		if (
			!candidate ||
			/^>/.test(candidate) ||
			/^#{1,6}\s/.test(candidate) ||
			/^(`{3,}|~{3,})/.test(candidate) ||
			/^(?:!\[\[|!\[[^\]]*\]\([^)]*\))/.test(candidate) ||
			/^\|/.test(candidate)
		) {
			continue;
		}

		const text = plainText(candidate);
		if (text) return truncate(text, 160);
	}
	return '';
}

function getWordCount(body: string) {
	const firstH1Removed = body.replace(/^#\s+[^\r\n]*(?:\r?\n|$)/m, '');
	const text = plainText(withoutCodeAndMath(firstH1Removed));
	const cjkCharacters =
		text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Bopomofo}]/gu) ?? [];
	const latinWords = text.match(/\p{Script=Latin}+(?:['’]\p{Script=Latin}+)*/gu) ?? [];
	return {
		cjk: cjkCharacters.length,
		latin: latinWords.length,
		words: cjkCharacters.length + latinWords.length,
	};
}

function formatDate(date: string) {
	const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/.exec(date);
	return match ? `${match[1]} ${match[2]}` : date;
}

export function toPost(entry: PostEntry): Post {
	const body = entry.body ?? '';
	const segments = entry.id.replace(/\.md$/i, '').split('/');
	const filename = segments.at(-1) ?? '';
	const primary = segments[0] ?? '';
	const secondary = segments.length === 3 ? segments[1] : undefined;
	const category = CATEGORIES.find((item) => item.name === primary);

	if (!category || segments.length < 2 || segments.length > 3) {
		throw new Error(`Invalid post path in content collection: ${entry.id}`);
	}

	const titleMatch = /^#\s+(.+?)\s*#*\s*$/m.exec(body);
	if (!titleMatch) throw new Error(`Post is missing an H1 title: ${entry.id}`);
	const title = titleMatch[1].trim();
	const slug = new GithubSlugger().slug(filename);
	const { cjk, latin, words } = getWordCount(body);
	const frontmatterDescription = entry.data.description?.trim();

	return {
		entry,
		id: entry.id,
		slug,
		href: `/posts/${slug}/`,
		primary,
		primarySlug: category.slug,
		secondary,
		title,
		date: entry.data.date,
		displayDate: formatDate(entry.data.date),
		updated: entry.data.updated,
		displayUpdated: entry.data.updated ? formatDate(entry.data.updated) : undefined,
		description: frontmatterDescription || getFallbackDescription(body),
		words,
		readTime: Math.max(1, Math.ceil(cjk / 300 + latin / 200)),
		titleImage: entry.data.titleImage,
	};
}

let publishedPostsPromise: Promise<Post[]> | undefined;

export function getPublishedPosts() {
	return (publishedPostsPromise ??= loadPublishedPosts());
}

async function loadPublishedPosts() {
	const entries = await getCollection('posts', ({ data }) => data.publish);
	const posts = entries.map(toPost);
	const slugs = new Set<string>();

	for (const post of posts) {
		if (slugs.has(post.slug)) throw new Error(`Duplicate post URL slug: ${post.slug}`);
		slugs.add(post.slug);
	}

	return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

import { existsSync } from 'node:fs';
import path from 'node:path';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const draftsDirectory = path.resolve(process.cwd(), 'src/content/drafts');
const draftsGlobLoader = glob({
	pattern: ['**/*.md', '!_attachments/**'],
	base: './src/content/drafts',
	generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
});
const draftsLoader = {
	name: 'dev-only-drafts',
	async load(context: Parameters<typeof draftsGlobLoader.load>[0]) {
		if (!import.meta.env.DEV || !existsSync(draftsDirectory)) {
			for (const id of context.store.keys()) context.store.delete(id);
			return;
		}
		await draftsGlobLoader.load(context);
	},
};

const posts = defineCollection({
	loader: glob({
		pattern: ['**/*.md', '!_attachments/**'],
		base: './src/content/posts',
		generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
	}),
	schema: z.object({
		date: z.string(),
		publish: z.boolean(),
		description: z.string().optional(),
		updated: z.string().optional(),
		titleImage: z.string().optional(),
	}),
});

const drafts = defineCollection({
	loader: draftsLoader,
	schema: z.object({
		date: z.string().optional(),
		publish: z.boolean().optional(),
		description: z.string().optional(),
		updated: z.string().optional(),
		titleImage: z.string().optional(),
	}),
});

export const collections = { posts, drafts };

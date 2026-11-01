import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

export const collections = { posts };

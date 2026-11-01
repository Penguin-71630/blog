import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const datePattern = /^\d{4}-\d{2}-\d{2}(?:$|T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)$/;
const dateSchema = z
	.union([z.string(), z.date()])
	.transform((value) =>
		value instanceof Date
			? `${value.getUTCFullYear()}-${String(value.getUTCMonth() + 1).padStart(2, '0')}-${String(value.getUTCDate()).padStart(2, '0')}`
			: value,
	)
	.refine((value) => datePattern.test(value), {
		message: 'Date must be YYYY-MM-DD or an ISO datetime.',
	});

const posts = defineCollection({
	loader: glob({
		pattern: ['**/*.md', '!_attachments/**'],
		base: './src/content/posts',
		generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
	}),
	schema: z.object({
		date: dateSchema,
		publish: z.boolean().default(false),
		description: z.string().optional(),
	}),
});

export const collections = { posts };

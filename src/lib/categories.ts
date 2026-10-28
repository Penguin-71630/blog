export const CATEGORIES = [
	{ name: 'Operating System', slug: 'operating-system' },
	{ name: 'Computer Organization', slug: 'computer-organization' },
	{ name: 'DS, Algorithms', slug: 'ds-algo' },
	{ name: 'Linear Algebra', slug: 'linear-algebra' },
	{ name: 'Discrete Mathematics', slug: 'discrete-mathematics' },
	{ name: 'Parallel Programming', slug: 'parallel-programming' },
	{ name: 'Compiler (Frontend)', slug: 'compiler-frontend' },
	{ name: 'Formal Language', slug: 'formal-language' },
	{ name: 'Language Learning', slug: 'language-learning' },
	{ name: 'Other Course Notes', slug: 'other-course-notes' },
	{ name: 'Life Logs', slug: 'life-logs' },
	{ name: 'Rhythm Game', slug: 'rhythm-game' },
	{ name: 'C, C++', slug: 'c-cpp' },
	{ name: 'Miscellaneous', slug: 'miscellaneous' },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category['slug'];

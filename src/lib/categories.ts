import categoryBg1 from '../assets/category-bg/1.webp';
import categoryBg2 from '../assets/category-bg/2.webp';
import categoryBg3 from '../assets/category-bg/3.webp';
import categoryBg4 from '../assets/category-bg/4.webp';
import categoryBg5 from '../assets/category-bg/5.webp';
import categoryBg6 from '../assets/category-bg/6.webp';
import categoryBg7 from '../assets/category-bg/7.webp';
import categoryBg8 from '../assets/category-bg/8.webp';
import categoryBg9 from '../assets/category-bg/9.webp';
import categoryBg10 from '../assets/category-bg/10.webp';
import categoryBg11 from '../assets/category-bg/11.webp';
import categoryBg12 from '../assets/category-bg/12.webp';
import categoryBg13 from '../assets/category-bg/13.webp';
import categoryBg14 from '../assets/category-bg/14.webp';

export const CATEGORIES = [
	{ name: 'Operating System', slug: 'operating-system', bg: categoryBg1 },
	{ name: 'Computer Organization', slug: 'computer-organization', bg: categoryBg2 },
	{ name: 'DS, Algorithms', slug: 'ds-algo', bg: categoryBg3 },
	{ name: 'Linear Algebra', slug: 'linear-algebra', bg: categoryBg4 },
	{ name: 'Discrete Mathematics', slug: 'discrete-mathematics', bg: categoryBg5 },
	{ name: 'Parallel Programming', slug: 'parallel-programming', bg: categoryBg6 },
	{ name: 'Compiler (Frontend)', slug: 'compiler-frontend', bg: categoryBg7 },
	{ name: 'Formal Language', slug: 'formal-language', bg: categoryBg8 },
	{ name: 'Language Learning', slug: 'language-learning', bg: categoryBg9 },
	{ name: 'Other Course Notes', slug: 'other-course-notes', bg: categoryBg10 },
	{ name: 'Life Logs', slug: 'life-logs', bg: categoryBg11 },
	{ name: 'Rhythm Game', slug: 'rhythm-game', bg: categoryBg12 },
	{ name: 'C, C++', slug: 'c-cpp', bg: categoryBg14 },
	{ name: 'Miscellaneous', slug: 'miscellaneous', bg: categoryBg13 },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category['slug'];

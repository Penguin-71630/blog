import type { ImageMetadata } from 'astro';
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
import { CATEGORY_DEFINITIONS } from './category-definitions';

export type CategorySlug = (typeof CATEGORY_DEFINITIONS)[number]['slug'];

const backgrounds = {
	'operating-system': categoryBg1,
	'computer-organization': categoryBg2,
	'ds-algo': categoryBg3,
	'linear-algebra': categoryBg4,
	'discrete-mathematics': categoryBg5,
	'parallel-programming': categoryBg6,
	'compiler-frontend': categoryBg7,
	'formal-language': categoryBg8,
	'language-learning': categoryBg9,
	'other-course-notes': categoryBg10,
	'life-logs': categoryBg11,
	'rhythm-game': categoryBg12,
	'c-cpp': categoryBg14,
	miscellaneous: categoryBg13,
} satisfies Record<CategorySlug, ImageMetadata>;

export const CATEGORIES = CATEGORY_DEFINITIONS.map((category) => ({
	...category,
	bg: backgrounds[category.slug],
}));

export type Category = (typeof CATEGORIES)[number];

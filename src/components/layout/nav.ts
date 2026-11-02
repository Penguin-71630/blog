import type { ImageMetadata } from 'astro';
import aboutIcon from '../../assets/nav/about-icon.webp';
import aboutWord from '../../assets/nav/about-word.webp';
import archivesIcon from '../../assets/nav/archives-icon.webp';
import archivesWord from '../../assets/nav/archives-word.webp';
import articlesIcon from '../../assets/nav/articles-icon.webp';
import articlesWord from '../../assets/nav/articles-word.webp';
import categoriesIcon from '../../assets/nav/categories-icon.webp';
import categoriesWord from '../../assets/nav/categories-word.webp';

export type NavKey = 'articles' | 'about' | 'categories' | 'archives';

export const NAV_ITEMS = [
	{ key: 'articles', label: 'Articles', href: '/', word: articlesWord, icon: articlesIcon },
	{ key: 'about', label: 'About Me', href: '/about/', word: aboutWord, icon: aboutIcon },
	{ key: 'categories', label: 'Categories', href: '/categories/', word: categoriesWord, icon: categoriesIcon },
	{ key: 'archives', label: 'Archive', href: '/archives/', word: archivesWord, icon: archivesIcon },
] as const satisfies readonly {
	key: NavKey;
	label: string;
	href: string;
	word: ImageMetadata;
	icon: ImageMetadata;
}[];

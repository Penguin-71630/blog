import type { IconName } from '../../icons';

export type NavKey = 'articles' | 'about' | 'categories' | 'archives';

export const NAV_ITEMS = [
	{ key: 'articles', label: 'Articles', href: '/', icon: 'ri-article-line' },
	{ key: 'about', label: 'About Me', href: '/about/', icon: 'ri-user-3-line' },
	{ key: 'categories', label: 'Categories', href: '/categories/', icon: 'ri-folder-open-line' },
	{ key: 'archives', label: 'Archives', href: '/archives/', icon: 'ri-archive-line' },
] as const satisfies readonly { key: NavKey; label: string; href: string; icon: IconName }[];

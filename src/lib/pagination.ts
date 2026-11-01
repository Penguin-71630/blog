export const PAGE_SIZE = 10;

export function paginate<T>(items: T[], page: number): { items: T[]; current: number; total: number } {
	const total = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
	const current = Math.min(total, Math.max(1, Math.trunc(page) || 1));
	const start = (current - 1) * PAGE_SIZE;

	return {
		items: items.slice(start, start + PAGE_SIZE),
		current,
		total,
	};
}

export function pageHref(base: string, page: number): string {
	const normalizedBase = base.endsWith('/') ? base : `${base}/`;
	return page <= 1 ? normalizedBase : `${normalizedBase}page/${page}/`;
}

export function paginationItems(current: number, total: number): (number | 'ellipsis')[] {
	const pageTotal = Math.max(1, Math.trunc(total) || 1);
	const currentPage = Math.min(pageTotal, Math.max(1, Math.trunc(current) || 1));
	const pages = new Set<number>([1, pageTotal]);

	for (let page = Math.max(1, currentPage - 1); page <= Math.min(pageTotal, currentPage + 1); page += 1) {
		pages.add(page);
	}

	const items: (number | 'ellipsis')[] = [];
	let previousPage = 0;

	for (const page of [...pages].sort((a, b) => a - b)) {
		const gap = page - previousPage;
		if (previousPage && gap === 2) items.push(previousPage + 1);
		else if (previousPage && gap > 2) items.push('ellipsis');
		items.push(page);
		previousPage = page;
	}

	return items;
}

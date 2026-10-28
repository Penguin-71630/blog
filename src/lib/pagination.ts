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

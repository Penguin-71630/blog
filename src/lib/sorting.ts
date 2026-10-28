const naturalCollator = new Intl.Collator('en', { numeric: true });

export function compareNaturally(left: string, right: string) {
	return naturalCollator.compare(left, right);
}

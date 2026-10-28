const initializedRoots = new WeakSet();
const copyTimers = new WeakMap();

function copyText(text) {
	if (navigator.clipboard && window.isSecureContext) {
		return navigator.clipboard.writeText(text);
	}

	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.style.cssText = 'position:fixed;opacity:0';
	document.body.appendChild(textarea);
	textarea.select();
	try {
		document.execCommand('copy');
	} finally {
		textarea.remove();
	}
	return Promise.resolve();
}

export function initCodeCopy(root = document) {
	if (initializedRoots.has(root)) return;
	initializedRoots.add(root);

	root.addEventListener('click', async (event) => {
		if (!(event.target instanceof Element)) return;
		const button = event.target.closest('.gb-code-copy');
		if (!button || !root.contains(button)) return;

		const code = button.closest('.gb-code')?.querySelector('pre code');
		if (!code) return;

		try {
			await copyText((code.textContent || '').replace(/\n$/, ''));
		} catch {
			return;
		}

		clearTimeout(copyTimers.get(button));
		button.classList.add('is-copied');
		button.setAttribute('aria-label', 'Copied');
		button.title = 'Copied';
		copyTimers.set(button, setTimeout(() => {
			button.classList.remove('is-copied');
			button.setAttribute('aria-label', 'Copy code');
			button.title = 'Copy';
		}, 1600));
	});
}

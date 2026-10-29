function largestSource(image) {
	const sources = (image.getAttribute('srcset') || '')
		.split(',')
		.map((source) => source.trim().split(/\s+/)[0])
		.filter(Boolean);
	return sources.at(-1) || image.dataset.full || image.currentSrc || image.src;
}

export function initLightbox(root = document) {
	const images = [...root.querySelectorAll('.gb-prose img')].filter(
		(image) => !image.closest('.gb-item, a, .gb-about-avatar') && !image.closest('[data-lightbox-trigger]'),
	);
	if (!images.length) return;
	const lightbox = document.createElement('div');
	lightbox.className = 'gb-lightbox';
	lightbox.setAttribute('role', 'dialog');
	lightbox.setAttribute('aria-modal', 'true');
	lightbox.setAttribute('aria-label', '圖片預覽');
	lightbox.hidden = true;
	const close = document.createElement('button');
	close.className = 'gb-lightbox-close';
	close.type = 'button';
	close.setAttribute('aria-label', '關閉圖片預覽');
	close.textContent = '×';
	const enlarged = document.createElement('img');
	lightbox.append(close, enlarged);
	document.body.append(lightbox);
	let trigger = null;

	const closeLightbox = () => {
		lightbox.hidden = true;
		document.body.style.overflow = '';
		trigger?.focus();
	};
	const openLightbox = (image) => {
		trigger = image;
		enlarged.src = largestSource(image);
		enlarged.alt = image.alt;
		lightbox.hidden = false;
		document.body.style.overflow = 'hidden';
		close.focus();
	};
	close.addEventListener('click', closeLightbox);
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) closeLightbox();
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
	});
	images.forEach((image) => {
		image.tabIndex = 0;
		image.setAttribute('role', 'button');
		image.setAttribute('aria-label', `放大圖片：${image.alt || '文章圖片'}`);
		image.addEventListener('click', () => openLightbox(image));
		image.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openLightbox(image);
			}
		});
	});
}

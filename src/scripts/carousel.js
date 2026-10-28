function dimensions(slide) {
	const width = Number(slide.getAttribute('width')) || slide.naturalWidth;
	const height = Number(slide.getAttribute('height')) || slide.naturalHeight;
	return width > 0 && height > 0 ? height / width : 0;
}

export function initCarousels(root = document) {
	root.querySelectorAll('[data-carousel]:not([data-carousel-ready])').forEach((carousel) => {
		const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
		const counter = carousel.querySelector('[data-carousel-counter]');
		const previous = carousel.querySelector('[data-carousel-prev]');
		const next = carousel.querySelector('[data-carousel-next]');
		if (!slides.length || !counter || !previous || !next) return;
		carousel.setAttribute('data-carousel-ready', '');
		let index = 0;

		const setRatio = () => {
			const ratio = Math.max(0.01, ...slides.map(dimensions));
			if (ratio > 0.01) carousel.style.setProperty('--carousel-ratio', String(ratio));
		};
		const show = (nextIndex) => {
			index = (nextIndex + slides.length) % slides.length;
			slides.forEach((slide, slideIndex) => {
				slide.classList.toggle('is-active', slideIndex === index);
				slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true');
			});
			counter.textContent = `${index + 1} / ${slides.length}`;
		};

		slides.forEach((slide) => slide.addEventListener('load', setRatio, { once: true }));
		setRatio();
		show(0);
		previous.addEventListener('click', () => show(index - 1));
		next.addEventListener('click', () => show(index + 1));
		carousel.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				show(index - 1);
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				show(index + 1);
			}
		});
	});
}

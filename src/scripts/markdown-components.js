export function initMarkdownComponents(root = document) {
	root.querySelectorAll('[data-tabs]:not([data-components-ready])').forEach((tabs) => {
		const buttons = [...tabs.querySelectorAll(':scope > .gb-tablist > [role="tab"]')];
		const panels = [...tabs.querySelectorAll(':scope > .gb-tabpanels > [data-panel-index]')];
		if (!buttons.length || buttons.length !== panels.length) return;
		tabs.dataset.componentsReady = '';
		buttons.forEach((button, index) => {
			const id = `tab-panel-${Math.random().toString(36).slice(2)}-${index}`;
			const tabId = `tab-${Math.random().toString(36).slice(2)}-${index}`;
			button.id = tabId;
			button.setAttribute('aria-controls', id);
			panels[index].setAttribute('role', 'tabpanel');
			panels[index].setAttribute('aria-labelledby', tabId);
			panels[index].setAttribute('tabindex', '0');
			panels[index].id = id;
			button.addEventListener('click', () => select(index));
		});
		const select = (index) => {
			buttons.forEach((button, buttonIndex) => {
				button.setAttribute('aria-selected', String(buttonIndex === index));
				button.tabIndex = buttonIndex === index ? 0 : -1;
			});
			panels.forEach((panel, panelIndex) => panel.setAttribute('aria-hidden', String(panelIndex !== index)));
		};
		buttons.forEach((button, index) => button.addEventListener('keydown', (event) => {
			if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
			event.preventDefault();
			const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
			buttons[next].focus();
			select(next);
		}));
		select(0);
	});

	root.querySelectorAll('[data-slider]:not([data-components-ready])').forEach((slider) => {
		const panes = [...slider.querySelectorAll(':scope > .gb-stepper-stage > [data-panel-index]')];
		const title = slider.querySelector(':scope > .gb-stepper-bar .gb-stepper-title');
		const counter = slider.querySelector(':scope > .gb-stepper-bar [data-step-counter]');
		const previous = slider.querySelector(':scope > .gb-stepper-bar [data-step-prev]');
		const next = slider.querySelector(':scope > .gb-stepper-bar [data-step-next]');
		if (!panes.length || !title || !counter || !previous || !next) return;
		slider.dataset.componentsReady = '';
		let index = 0;
		const show = (nextIndex) => {
			index = Math.max(0, Math.min(panes.length - 1, nextIndex));
			panes.forEach((pane, paneIndex) => pane.setAttribute('aria-hidden', String(paneIndex !== index)));
			title.textContent = panes[index].dataset.panelTitle || '';
			counter.textContent = `${index + 1} / ${panes.length}`;
			slider.setAttribute(
				'aria-label',
				title.textContent ? `${title.textContent} (${counter.textContent})` : counter.textContent,
			);
			previous.disabled = index === 0;
			next.disabled = index === panes.length - 1;
		};
		panes.forEach((pane) => {
			if (!pane.dataset.panelTitle) pane.dataset.panelTitle = '';
		});
		previous.addEventListener('click', () => show(index - 1));
		next.addEventListener('click', () => show(index + 1));
		slider.addEventListener('keydown', (event) => {
			if (!(event.target instanceof Element) || event.target.closest('[data-slider]') !== slider) return;
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				show(index - 1);
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				show(index + 1);
			}
		});
		show(0);
	});

	const abcBlocks = [...root.querySelectorAll('pre code.language-abc:not([data-rendered])')];
	if (abcBlocks.length) {
		abcBlocks.forEach((code) => { code.dataset.rendered = 'true'; });
		void (async () => {
			let abcjs;
			try {
				const module = await import('abcjs');
				abcjs = module.default || module;
			} catch (error) {
				console.warn('Unable to load ABC renderer.', error);
				return;
			}
			for (const code of abcBlocks) {
				const pre = code.closest('pre');
				if (!pre) continue;
				const target = document.createElement('div');
				target.className = 'gb-staff';
				try {
					abcjs.renderAbc(target, code.textContent || '', { responsive: 'resize', add_classes: true });
					if (!target.querySelector('svg')) throw new Error('ABC renderer produced no staff.');
					pre.replaceWith(target);
				} catch (error) {
					console.warn('Unable to render ABC block.', error);
				}
			}
		})();
	}

	const mermaidBlocks = [...root.querySelectorAll('pre code.language-mermaid:not([data-rendered])')];
	if (mermaidBlocks.length) {
		mermaidBlocks.forEach((code) => { code.dataset.rendered = 'true'; });
		void (async () => {
			let mermaid;
			try {
				const module = await import('mermaid');
				mermaid = module.default;
				await document.fonts.ready;
				const styles = getComputedStyle(document.documentElement);
				const fontFamily = styles.getPropertyValue('--font-body').trim();
				const color = (name) => {
					const value = styles.getPropertyValue(name).trim();
					const match = /^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/i.exec(value);
					if (!match) return value;
					const lightness = Number(match[1]) / (value.includes('%') ? 100 : 1);
					const chroma = Number(match[2]);
					const hue = (Number(match[3]) * Math.PI) / 180;
					const a = chroma * Math.cos(hue);
					const b = chroma * Math.sin(hue);
					const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
					const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
					const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
					const channels = [
						4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
						-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
						-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
					].map((channel) => {
						const clamped = Math.max(0, Math.min(1, channel));
						return Math.round(255 * (clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055));
					});
					return `rgb(${channels.join(', ')})`;
				};
				mermaid.initialize({
					startOnLoad: false,
					theme: 'dark',
					fontFamily,
					themeVariables: {
						background: color('--bg'),
						primaryColor: color('--surface-hover'),
						primaryTextColor: color('--text'),
						primaryBorderColor: color('--border'),
						lineColor: color('--muted'),
						secondaryColor: color('--surface'),
						tertiaryColor: color('--bg'),
						textColor: color('--text'),
						edgeLabelBackground: color('--bg'),
						noteBkgColor: color('--surface'),
						noteTextColor: color('--text'),
						noteBorderColor: color('--border'),
						actorBkg: color('--surface'),
						actorBorder: color('--border'),
						actorTextColor: color('--text'),
						actorLineColor: color('--muted'),
						signalColor: color('--text'),
						signalTextColor: color('--text'),
						labelBoxBkgColor: color('--surface'),
						labelTextColor: color('--text'),
					},
				});
			} catch (error) {
				console.warn('Unable to load Mermaid renderer.', error);
				return;
			}
			for (const code of mermaidBlocks) {
				const pre = code.closest('pre');
				if (!pre) continue;
				const target = document.createElement('div');
				target.className = 'gb-mermaid';
				target.textContent = code.textContent || '';
				target.hidden = true;
				pre.after(target);
				try {
					await mermaid.run({ nodes: [target], suppressErrors: false });
					if (!target.querySelector('svg')) throw new Error('Mermaid renderer produced no diagram.');
					pre.remove();
					target.hidden = false;
				} catch (error) {
					target.remove();
					console.warn('Unable to render Mermaid block.', error);
				}
			}
		})();
	}
}

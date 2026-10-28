export function initMarkdownComponents(root = document) {
	root.querySelectorAll('[data-tabs]:not([data-components-ready])').forEach((tabs) => {
		const buttons = [...tabs.querySelectorAll('[role="tab"]')];
		const panels = [...tabs.querySelectorAll('[data-panel-index]')];
		if (!buttons.length || buttons.length !== panels.length) return;
		tabs.dataset.componentsReady = '';
		buttons.forEach((button, index) => {
			const id = `tab-panel-${Math.random().toString(36).slice(2)}-${index}`;
			button.setAttribute('aria-controls', id);
			panels[index].id = id;
			button.addEventListener('click', () => select(index));
		});
		const select = (index) => {
			buttons.forEach((button, buttonIndex) => button.setAttribute('aria-selected', String(buttonIndex === index)));
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
		const panes = [...slider.querySelectorAll('[data-panel-index]')];
		const title = slider.querySelector('.gb-stepper-title');
		const counter = slider.querySelector('[data-step-counter]');
		const previous = slider.querySelector('[data-step-prev]');
		const next = slider.querySelector('[data-step-next]');
		if (!panes.length || !title || !counter || !previous || !next) return;
		slider.dataset.componentsReady = '';
		let index = 0;
		const show = (nextIndex) => {
			index = Math.max(0, Math.min(panes.length - 1, nextIndex));
			panes.forEach((pane, paneIndex) => pane.setAttribute('aria-hidden', String(paneIndex !== index)));
			title.textContent = panes[index].dataset.panelTitle || '';
			counter.textContent = `${index + 1} / ${panes.length}`;
			previous.disabled = index === 0;
			next.disabled = index === panes.length - 1;
		};
		panes.forEach((pane) => {
			if (!pane.dataset.panelTitle) pane.dataset.panelTitle = '';
		});
		previous.addEventListener('click', () => show(index - 1));
		next.addEventListener('click', () => show(index + 1));
		slider.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft') show(index - 1);
			if (event.key === 'ArrowRight') show(index + 1);
		});
		show(0);
	});

	root.querySelectorAll('pre code.language-abc').forEach(async (code) => {
		if (code.dataset.rendered) return;
		code.dataset.rendered = 'true';
		const source = code.textContent || '';
		const pre = code.closest('pre');
		const target = document.createElement('div');
		target.className = 'gb-staff';
		pre?.replaceWith(target);
		const fallback = document.createElement('noscript');
		fallback.textContent = source;
		target.after(fallback);
		const abcjs = await import('abcjs');
		(abcjs.default || abcjs).renderAbc(target, source, { responsive: 'resize', add_classes: true });
	});

	root.querySelectorAll('pre code.language-mermaid').forEach(async (code) => {
		if (code.dataset.rendered) return;
		code.dataset.rendered = 'true';
		const source = code.textContent || '';
		const pre = code.closest('pre');
		const target = document.createElement('div');
		target.className = 'gb-mermaid';
		pre?.replaceWith(target);
		const fallback = document.createElement('noscript');
		fallback.textContent = source;
		target.after(fallback);
		const mermaidModule = await import('mermaid');
		const mermaid = mermaidModule.default;
		mermaid.initialize({ startOnLoad: false, theme: 'dark', themeVariables: { primaryColor: '#26303a', primaryTextColor: '#dae3e8', lineColor: '#94a8b4', secondaryColor: '#1d2630', tertiaryColor: '#11161d' } });
		await mermaid.run({ nodes: [target], suppressErrors: false });
	});
}

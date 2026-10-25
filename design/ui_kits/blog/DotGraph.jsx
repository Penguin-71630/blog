// Renders a ```dot fence with viz.js (CDN). Falls back to the DOT source.
const VIZ_SRC = 'https://cdn.jsdelivr.net/npm/@viz-js/viz@3.11.0/lib/viz-standalone.js';
let vizPromise = null;
function loadViz() {
  if (!vizPromise) vizPromise = new Promise((res, rej) => {
    if (window.Viz) return res(window.Viz.instance());
    const s = document.createElement('script'); s.src = VIZ_SRC;
    s.onload = () => res(window.Viz.instance()); s.onerror = rej; document.head.appendChild(s);
  });
  return vizPromise;
}
function DotGraph({ dot, maxWidth = 520 }) {
  const ref = React.useRef(null);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    loadViz().then((viz) => {
      if (!alive || !ref.current) return;
      const svg = viz.renderSVGElement(dot);
      svg.style.maxWidth = '100%'; svg.style.height = 'auto';
      ref.current.replaceChildren(svg);
    }).catch(() => setFailed(true));
    return () => { alive = false; };
  }, [dot]);
  if (failed) { const { CodeBlock } = window.GinoSBlogDesignSystem_e90488; return <CodeBlock lang="dot" code={dot} />; }
  return <div ref={ref} style={{ display: 'flex', justifyContent: 'center', margin: '1.2em auto', maxWidth, minHeight: 80 }}></div>;
}
window.DotGraph = DotGraph;

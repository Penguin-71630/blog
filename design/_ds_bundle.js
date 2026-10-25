/* @ds-bundle: {"format":4,"namespace":"GinoSBlogDesignSystem_e90488","components":[{"name":"ItemCard","sourcePath":"components/about/ItemCard.jsx"},{"name":"ItemCards","sourcePath":"components/about/ItemCards.jsx"},{"name":"People","sourcePath":"components/about/People.jsx"},{"name":"Person","sourcePath":"components/about/Person.jsx"},{"name":"Aside","sourcePath":"components/content/Aside.jsx"},{"name":"Callout","sourcePath":"components/content/Callout.jsx"},{"name":"CodeBlock","sourcePath":"components/content/CodeBlock.jsx"},{"name":"Figure","sourcePath":"components/content/Figure.jsx"},{"name":"MarkerList","sourcePath":"components/content/MarkerList.jsx"},{"name":"Reference","sourcePath":"components/content/Reference.jsx"},{"name":"Ruby","sourcePath":"components/content/Ruby.jsx"},{"name":"Table","sourcePath":"components/content/Table.jsx"},{"name":"Tex","sourcePath":"components/content/Tex.jsx"},{"name":"Carousel","sourcePath":"components/interactive/Carousel.jsx"},{"name":"LinkCard","sourcePath":"components/interactive/LinkCard.jsx"},{"name":"Slider","sourcePath":"components/interactive/Slider.jsx"},{"name":"Staff","sourcePath":"components/interactive/Staff.jsx"},{"name":"Tabs","sourcePath":"components/interactive/Tabs.jsx"},{"name":"ArchiveList","sourcePath":"components/listing/ArchiveList.jsx"},{"name":"ArticleCard","sourcePath":"components/listing/ArticleCard.jsx"},{"name":"CategoryIcon","sourcePath":"components/listing/CategoryIcon.jsx"},{"name":"CategoryPath","sourcePath":"components/listing/CategoryPath.jsx"},{"name":"CategoryTile","sourcePath":"components/listing/CategoryTile.jsx"},{"name":"GroupDivider","sourcePath":"components/listing/GroupDivider.jsx"},{"name":"PageTitle","sourcePath":"components/listing/PageTitle.jsx"},{"name":"MobileTopBar","sourcePath":"components/navigation/MobileTopBar.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"SeriesTree","sourcePath":"components/navigation/SeriesTree.jsx"},{"name":"NAV_ITEMS","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"TableOfContents","sourcePath":"components/navigation/TableOfContents.jsx"},{"name":"ThemeToggle","sourcePath":"components/navigation/ThemeToggle.jsx"}],"sourceHashes":{"components/about/ItemCard.jsx":"02985992cf79","components/about/ItemCards.jsx":"adddb75e3ffb","components/about/People.jsx":"94fd4797c557","components/about/Person.jsx":"da2528791560","components/content/Aside.jsx":"b057cf62ca35","components/content/Callout.jsx":"b034038a5616","components/content/CodeBlock.jsx":"eeb8e3492719","components/content/Figure.jsx":"5c7d572e7fae","components/content/MarkerList.jsx":"6df1e210157a","components/content/Reference.jsx":"df52f06e2a33","components/content/Ruby.jsx":"f2217ae22391","components/content/Table.jsx":"7c3750875f3d","components/content/Tex.jsx":"046aa01ad6f5","components/interactive/Carousel.jsx":"7c2d690dd8c8","components/interactive/LinkCard.jsx":"06c1c17070f4","components/interactive/Slider.jsx":"14d10066cde4","components/interactive/Staff.jsx":"6cbe8fdb745d","components/interactive/Tabs.jsx":"5520ca3d41a3","components/listing/ArchiveList.jsx":"3551a6726e88","components/listing/ArticleCard.jsx":"a1733488e73d","components/listing/CategoryIcon.jsx":"7aa7933f759d","components/listing/CategoryPath.jsx":"88b278bc6948","components/listing/CategoryTile.jsx":"d445c834e413","components/listing/GroupDivider.jsx":"4581948706c2","components/listing/PageTitle.jsx":"58323b6363dd","components/navigation/MobileTopBar.jsx":"03e3c841e4cb","components/navigation/NavItem.jsx":"449434e9e033","components/navigation/Pagination.jsx":"19531cda774e","components/navigation/SeriesTree.jsx":"6f16a40751ad","components/navigation/Sidebar.jsx":"c227106fcfa7","components/navigation/TableOfContents.jsx":"69188c63b39e","components/navigation/ThemeToggle.jsx":"01bc3ad6f113","scraps/dev-bundle.js":"de28d76f9197","ui_kits/blog/DotGraph.jsx":"bee497602e90","ui_kits/blog/PostCache.jsx":"d53d22f6cf54","ui_kits/blog/PostMatching.jsx":"23fa2ebf2fce","ui_kits/blog/Screens.jsx":"46b2e3081f80","ui_kits/blog/data.js":"40a86ab92994"},"inlinedExternals":[],"unexposedExports":[{"name":"resolveCalloutType","sourcePath":"components/content/Callout.jsx"}]} */

(() => {

const __ds_ns = (window.GinoSBlogDesignSystem_e90488 = window.GinoSBlogDesignSystem_e90488 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/about/ItemCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ItemCard({
  title,
  subtitle,
  img,
  url
}) {
  const Tag = url ? 'a' : 'div';
  const p = url ? {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: "gb-item"
  }, p), /*#__PURE__*/React.createElement("div", {
    className: "gb-item-img"
  }, img ? /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: title || '',
    loading: "lazy"
  }) : null), /*#__PURE__*/React.createElement("span", {
    className: "gb-item-title",
    title: title
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    className: "gb-item-sub",
    title: subtitle
  }, subtitle) : null);
}
Object.assign(__ds_scope, { ItemCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/about/ItemCard.jsx", error: String((e && e.message) || e) }); }

// components/about/ItemCards.jsx
try { (() => {
function ItemCards({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-items"
  }, children);
}
Object.assign(__ds_scope, { ItemCards });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/about/ItemCards.jsx", error: String((e && e.message) || e) }); }

// components/about/People.jsx
try { (() => {
function People({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-items"
  }, children);
}
Object.assign(__ds_scope, { People });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/about/People.jsx", error: String((e && e.message) || e) }); }

// components/about/Person.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Person({
  title,
  subtitle,
  img,
  url
}) {
  const Tag = url ? 'a' : 'div';
  const p = url ? {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: "gb-item gb-person"
  }, p), /*#__PURE__*/React.createElement("div", {
    className: "gb-item-img"
  }, img ? /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: title || '',
    loading: "lazy"
  }) : null), /*#__PURE__*/React.createElement("span", {
    className: "gb-item-title",
    title: title
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    className: "gb-item-sub",
    title: subtitle
  }, subtitle) : null);
}
Object.assign(__ds_scope, { Person });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/about/Person.jsx", error: String((e && e.message) || e) }); }

// components/content/Aside.jsx
try { (() => {
function Aside({
  label = 'Note',
  children
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "gb-aside",
    "data-callout": "aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-aside-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-sticky-note-line",
    "aria-hidden": "true"
  }), label), /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { Aside });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Aside.jsx", error: String((e && e.message) || e) }); }

// components/content/Callout.jsx
try { (() => {
const ALIAS = {
  summary: 'abstract',
  tldr: 'abstract',
  hint: 'tip',
  important: 'tip',
  check: 'success',
  done: 'success',
  help: 'question',
  faq: 'question',
  caution: 'warning',
  attention: 'warning',
  fail: 'failure',
  missing: 'failure',
  error: 'danger',
  cite: 'quote'
};
const ICON = {
  note: 'pencil',
  abstract: 'clipboard-list',
  info: 'info',
  todo: 'circle-check',
  tip: 'flame',
  success: 'check',
  question: 'circle-help',
  warning: 'triangle-alert',
  failure: 'x',
  danger: 'zap',
  bug: 'bug',
  example: 'list',
  quote: 'quote'
};
function resolveCalloutType(type) {
  const t = String(type || 'note').toLowerCase();
  const base = ALIAS[t] || t;
  return ICON[base] ? base : 'note';
}
function Callout({
  type = 'note',
  title,
  fold,
  children
}) {
  const raw = String(type).toLowerCase();
  if (raw === 'center') return /*#__PURE__*/React.createElement("div", {
    className: "gb-center"
  }, children);
  const base = resolveCalloutType(raw);
  const [collapsed, setCollapsed] = React.useState(fold === '-');
  const foldable = fold === '+' || fold === '-';
  const label = title != null && title !== '' ? title : raw.charAt(0).toUpperCase() + raw.slice(1);
  return /*#__PURE__*/React.createElement("div", {
    className: 'gb-callout' + (foldable ? ' is-foldable' : '') + (collapsed ? ' is-collapsed' : ''),
    "data-type": base,
    "data-callout": raw
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-callout-title",
    onClick: foldable ? () => setCollapsed(!collapsed) : undefined,
    role: foldable ? 'button' : undefined,
    tabIndex: foldable ? 0 : undefined,
    "aria-expanded": foldable ? !collapsed : undefined,
    onKeyDown: foldable ? e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setCollapsed(!collapsed);
      }
    } : undefined
  }, /*#__PURE__*/React.createElement("i", {
    className: 'icon-' + ICON[base],
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, label), foldable ? /*#__PURE__*/React.createElement("i", {
    className: "icon-chevron-down gb-fold",
    "aria-hidden": "true"
  }) : null), !collapsed && children ? /*#__PURE__*/React.createElement("div", {
    className: "gb-callout-body"
  }, children) : null);
}
Object.assign(__ds_scope, { resolveCalloutType, Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Callout.jsx", error: String((e && e.message) || e) }); }

// components/content/CodeBlock.jsx
try { (() => {
const KW = new Set('for while if else return int long char void bool auto const static struct class public private using namespace template typename include define break continue switch case default new delete true false nullptr def import from in and or not None True False let var function'.split(' '));
const TY = new Set('int long short double float char bool void size_t string vector map set pair unsigned signed auto'.split(' '));
const RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])')|(\b\d[\d']*(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
function highlight(code, lang) {
  if (!lang || lang === 'text' || lang === 'plain') return code;
  const out = [];
  let last = 0;
  let m;
  let k = 0;
  RE.lastIndex = 0;
  while (m = RE.exec(code)) {
    if (m.index > last) out.push(code.slice(last, m.index));
    let cls = null;
    if (m[1]) cls = m[1][0] === '#' && /^#\s*(include|define|pragma)/.test(m[1]) ? 'tok-k' : 'tok-c';else if (m[2]) cls = 'tok-s';else if (m[3]) cls = 'tok-n';else if (m[4]) {
      const w = m[4];
      if (TY.has(w)) cls = 'tok-t';else if (KW.has(w)) cls = 'tok-k';else if (code[RE.lastIndex] === '(') cls = 'tok-f';
    }
    out.push(cls ? /*#__PURE__*/React.createElement("span", {
      key: k++,
      className: cls
    }, m[0]) : m[0]);
    last = RE.lastIndex;
  }
  out.push(code.slice(last));
  return out;
}
function copyText(t) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
  const ta = document.createElement('textarea');
  ta.value = t;
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
  } finally {
    ta.remove();
  }
  return Promise.resolve();
}
function CodeBlock({
  code = '',
  lang,
  showLang = true,
  copyable = true
}) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef();
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const onCopy = () => copyText(code.replace(/\n$/, '')).then(() => {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-code gb-prose",
    style: {
      fontSize: 'inherit'
    }
  }, showLang && lang ? /*#__PURE__*/React.createElement("span", {
    className: "gb-code-lang"
  }, lang) : null, copyable ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'gb-code-copy' + (copied ? ' is-copied' : ''),
    onClick: onCopy,
    "aria-label": copied ? 'Copied' : 'Copy code',
    title: copied ? 'Copied' : 'Copy'
  }, /*#__PURE__*/React.createElement("i", {
    className: copied ? 'ri-check-line' : 'ri-file-copy-line',
    "aria-hidden": "true"
  })) : null, /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", null, highlight(code.replace(/\n$/, ''), lang))));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/Figure.jsx
try { (() => {
function Figure({
  src,
  alt,
  caption,
  center = false,
  width,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const w = width == null ? undefined : typeof width === 'number' ? width : width;
  return /*#__PURE__*/React.createElement("figure", {
    className: 'gb-figure' + (center ? ' is-center' : ''),
    style: style
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || caption || '',
    style: {
      width: w
    },
    onClick: () => setOpen(true)
  }), caption ? /*#__PURE__*/React.createElement("figcaption", null, caption) : null, open ? /*#__PURE__*/React.createElement("div", {
    className: "gb-lightbox",
    onClick: () => setOpen(false),
    role: "dialog",
    "aria-label": alt || caption || '圖片'
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || caption || ''
  })) : null);
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Figure.jsx", error: String((e && e.message) || e) }); }

// components/content/MarkerList.jsx
try { (() => {
const M = {
  i: ['ri-information-line', 'gb-marker-i', '資訊'],
  k: ['ri-key-2-line', 'gb-marker-k', '重點'],
  p: ['ri-thumb-up-line', 'gb-marker-p', '正面'],
  c: ['ri-thumb-down-line', 'gb-marker-c', '負面'],
  ' ': ['ri-checkbox-blank-line', 'gb-marker-todo', '待辦'],
  x: ['ri-checkbox-line', 'gb-marker-done', '完成']
};
function MarkerList({
  items = []
}) {
  return /*#__PURE__*/React.createElement("ul", {
    className: "gb-markers"
  }, items.map((it, i) => {
    const m = M[it.marker] || M.i;
    return /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement("i", {
      className: m[0] + ' ' + m[1],
      role: "img",
      "aria-label": m[2]
    }), /*#__PURE__*/React.createElement("div", null, it.content));
  }));
}
Object.assign(__ds_scope, { MarkerList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MarkerList.jsx", error: String((e && e.message) || e) }); }

// components/content/Reference.jsx
try { (() => {
function Reference({
  label = 'Reference',
  children
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "gb-aside",
    "data-callout": "reference"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-aside-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-book-2-line",
    "aria-hidden": "true"
  }), label), /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { Reference });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Reference.jsx", error: String((e && e.message) || e) }); }

// components/content/Ruby.jsx
try { (() => {
function Ruby({
  base,
  reading
}) {
  return /*#__PURE__*/React.createElement("ruby", {
    style: {
      rubyPosition: 'over'
    }
  }, base, /*#__PURE__*/React.createElement("rp", null, "("), /*#__PURE__*/React.createElement("rt", {
    style: {
      fontSize: '.55em',
      color: 'var(--muted)',
      fontWeight: 400
    }
  }, reading), /*#__PURE__*/React.createElement("rp", null, ")"));
}
Object.assign(__ds_scope, { Ruby });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Ruby.jsx", error: String((e && e.message) || e) }); }

// components/content/Table.jsx
try { (() => {
function Table({
  columns = [],
  rows = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-table-wrap gb-prose",
    style: {
      fontSize: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("table", null, columns.some(c => c.width) ? /*#__PURE__*/React.createElement("colgroup", null, columns.map((c, i) => /*#__PURE__*/React.createElement("col", {
    key: i,
    style: {
      width: c.width
    }
  }))) : null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: c.align || 'left'
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, r.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      textAlign: columns[ci] && columns[ci].align || 'left'
    }
  }, cell)))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Table.jsx", error: String((e && e.message) || e) }); }

// components/content/Tex.jsx
try { (() => {
function Tex({
  tex = '',
  display = false
}) {
  const k = typeof window !== 'undefined' ? window.katex : null;
  if (k) {
    const html = k.renderToString(tex, {
      displayMode: display,
      throwOnError: false
    });
    return display ? /*#__PURE__*/React.createElement("div", {
      className: "math",
      dangerouslySetInnerHTML: {
        __html: html
      }
    }) : /*#__PURE__*/React.createElement("span", {
      className: "math",
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  }
  return /*#__PURE__*/React.createElement("code", {
    className: "math"
  }, tex);
}
Object.assign(__ds_scope, { Tex });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Tex.jsx", error: String((e && e.message) || e) }); }

// components/interactive/Carousel.jsx
try { (() => {
function Carousel({
  images = [],
  fade = false
}) {
  const [i, setI] = React.useState(0);
  const [zoom, setZoom] = React.useState(null);
  const n = images.length;
  const go = d => setI((i + d + n) % n);
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-carousel",
    onKeyDown: e => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-carousel-stage"
  }, images.map((im, k) => /*#__PURE__*/React.createElement("img", {
    key: k,
    src: im.src,
    alt: im.alt || '',
    "aria-hidden": k !== i,
    onClick: () => setZoom(im),
    style: fade ? {
      opacity: k === i ? 1 : 0,
      transition: 'opacity var(--dur-fade) var(--ease)',
      pointerEvents: k === i ? 'auto' : 'none'
    } : {
      visibility: k === i ? 'visible' : 'hidden'
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gb-icon-btn gb-carousel-nav",
    style: {
      left: 8
    },
    onClick: () => go(-1),
    "aria-label": "\u4E0A\u4E00\u5F35"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-left-s-line"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gb-icon-btn gb-carousel-nav",
    style: {
      right: 8
    },
    onClick: () => go(1),
    "aria-label": "\u4E0B\u4E00\u5F35"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-right-s-line"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gb-carousel-dots"
  }, images.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    className: "gb-dot",
    "aria-current": k === i ? 'true' : undefined,
    "aria-label": '第 ' + (k + 1) + ' 張',
    onClick: () => setI(k)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6
    }
  }, i + 1, " / ", n)), zoom ? /*#__PURE__*/React.createElement("div", {
    className: "gb-lightbox",
    onClick: () => setZoom(null)
  }, /*#__PURE__*/React.createElement("img", {
    src: zoom.src,
    alt: zoom.alt || ''
  })) : null);
}
Object.assign(__ds_scope, { Carousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/Carousel.jsx", error: String((e && e.message) || e) }); }

// components/interactive/LinkCard.jsx
try { (() => {
function LinkCard({
  url,
  title,
  description,
  image,
  domain
}) {
  let host = domain;
  if (!host) {
    try {
      host = new URL(url).hostname;
    } catch (e) {
      host = url;
    }
  }
  return /*#__PURE__*/React.createElement("a", {
    className: "gb-linkcard",
    href: url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-linkcard-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gb-linkcard-title"
  }, title || url), description ? /*#__PURE__*/React.createElement("span", {
    className: "gb-linkcard-desc"
  }, description) : null, /*#__PURE__*/React.createElement("span", {
    className: "gb-linkcard-domain"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-link",
    "aria-hidden": "true"
  }), host)), image ? /*#__PURE__*/React.createElement("img", {
    className: "gb-linkcard-img",
    src: image,
    alt: ""
  }) : null);
}
Object.assign(__ds_scope, { LinkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/LinkCard.jsx", error: String((e && e.message) || e) }); }

// components/interactive/Slider.jsx
try { (() => {
function Slider({
  panels = [],
  fade = false
}) {
  const [i, setI] = React.useState(0);
  const n = panels.length;
  const prev = () => setI(Math.max(0, i - 1));
  const next = () => setI(Math.min(n - 1, i + 1));
  const onKey = e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-stepper",
    onKeyDown: onKey
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-stepper-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gb-stepper-title"
  }, panels[i] && panels[i].title), /*#__PURE__*/React.createElement("div", {
    className: "gb-stepper-ctrl"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gb-step-btn",
    onClick: prev,
    disabled: i === 0,
    "aria-label": "\u4E0A\u4E00\u6B65"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-left-s-line"
  })), /*#__PURE__*/React.createElement("span", {
    "aria-live": "polite"
  }, i + 1, " / ", n), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gb-step-btn",
    onClick: next,
    disabled: i === n - 1,
    "aria-label": "\u4E0B\u4E00\u6B65"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-right-s-line"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "gb-stepper-stage"
  }, panels.map((p, k) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "gb-stepper-pane",
    "aria-hidden": k !== i,
    style: fade ? {
      opacity: k === i ? 1 : 0,
      visibility: k === i ? 'visible' : 'hidden',
      transition: 'opacity var(--dur-fade) var(--ease), visibility var(--dur-fade)'
    } : {
      display: k === i ? 'block' : 'none'
    }
  }, p.content))));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/Slider.jsx", error: String((e && e.message) || e) }); }

// components/interactive/Staff.jsx
try { (() => {
const SRC = 'https://cdn.jsdelivr.net/npm/abcjs@6.4.4/dist/abcjs-basic-min.js';
let loading = null;
function loadAbc() {
  if (window.ABCJS) return Promise.resolve(window.ABCJS);
  if (!loading) loading = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = SRC;
    s.onload = () => res(window.ABCJS);
    s.onerror = rej;
    document.head.appendChild(s);
  });
  return loading;
}
function Staff({
  abc = ''
}) {
  const ref = React.useRef(null);
  const [err, setErr] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    loadAbc().then(A => {
      if (alive && ref.current) A.renderAbc(ref.current, abc, {
        responsive: 'resize',
        add_classes: true,
        paddingtop: 0,
        paddingbottom: 0
      });
    }).catch(() => setErr(true));
    return () => {
      alive = false;
    };
  }, [abc]);
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-staff"
  }, err ? /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: 13
    }
  }, abc) : /*#__PURE__*/React.createElement("div", {
    ref: ref
  }));
}
Object.assign(__ds_scope, { Staff });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/Staff.jsx", error: String((e && e.message) || e) }); }

// components/interactive/Tabs.jsx
try { (() => {
let uid = 0;
function Tabs({
  panels = [],
  defaultIndex = 0
}) {
  const [i, setI] = React.useState(defaultIndex);
  const id = React.useMemo(() => 'gbtabs' + ++uid, []);
  const onKey = e => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setI((i + 1) % panels.length);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setI((i - 1 + panels.length) % panels.length);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "gb-tabs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-tablist",
    role: "tablist",
    onKeyDown: onKey
  }, panels.map((p, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    role: "tab",
    className: "gb-tab",
    id: id + '-t' + k,
    "aria-controls": id + '-p' + k,
    "aria-selected": k === i,
    tabIndex: k === i ? 0 : -1,
    onClick: () => setI(k)
  }, p.title))), /*#__PURE__*/React.createElement("div", {
    className: "gb-tabpanel",
    role: "tabpanel",
    id: id + '-p' + i,
    "aria-labelledby": id + '-t' + i
  }, panels[i] && panels[i].content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/interactive/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/listing/ArchiveList.jsx
try { (() => {
function ArchiveList({
  groups = [],
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", null, groups.map(g => /*#__PURE__*/React.createElement("section", {
    key: g.year
  }, /*#__PURE__*/React.createElement("h2", {
    className: "gb-archive-year"
  }, g.year), /*#__PURE__*/React.createElement("div", {
    className: "gb-archive"
  }, g.posts.map((p, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    className: "gb-archive-item",
    href: p.href || '#',
    onClick: onSelect ? e => {
      e.preventDefault();
      onSelect(p);
    } : undefined
  }, /*#__PURE__*/React.createElement("time", null, p.date), /*#__PURE__*/React.createElement("span", null, p.title)))))));
}
Object.assign(__ds_scope, { ArchiveList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/listing/ArchiveList.jsx", error: String((e && e.message) || e) }); }

// components/listing/CategoryIcon.jsx
try { (() => {
function CategoryIcon({
  src,
  size = 28,
  alt = ''
}) {
  const s = {
    width: size,
    height: size
  };
  if (!src) return /*#__PURE__*/React.createElement("span", {
    className: "gb-cat-icon",
    style: s,
    "aria-hidden": "true"
  });
  if (/\.svg(\?|#|$)/i.test(src)) {
    const m = `url("${src}") center / contain no-repeat`;
    return /*#__PURE__*/React.createElement("span", {
      className: "gb-cat-icon gb-cat-icon--svg",
      role: alt ? 'img' : undefined,
      "aria-label": alt || undefined,
      "aria-hidden": alt ? undefined : 'true',
      style: {
        ...s,
        WebkitMask: m,
        mask: m
      }
    });
  }
  return /*#__PURE__*/React.createElement("img", {
    className: "gb-cat-icon",
    src: src,
    alt: alt,
    width: size,
    height: size,
    style: s
  });
}
Object.assign(__ds_scope, { CategoryIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/listing/CategoryIcon.jsx", error: String((e && e.message) || e) }); }

// components/listing/CategoryPath.jsx
try { (() => {
function CategoryPath({
  primary,
  secondary,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "gb-catpath",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", null, "# ", primary), secondary ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: '.86em',
      fontFamily: 'var(--font-body)'
    }
  }, "\u25B7"), /*#__PURE__*/React.createElement("span", null, secondary)) : null);
}
Object.assign(__ds_scope, { CategoryPath });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/listing/CategoryPath.jsx", error: String((e && e.message) || e) }); }

// components/listing/ArticleCard.jsx
try { (() => {
function ArticleCard({
  date,
  primary,
  secondary,
  title,
  description,
  words,
  readTime,
  icon,
  href = '#',
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "gb-card",
    href: href,
    onClick: onClick ? e => {
      e.preventDefault();
      onClick();
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-card-meta"
  }, /*#__PURE__*/React.createElement("time", {
    className: "gb-date"
  }, date), /*#__PURE__*/React.createElement(__ds_scope.CategoryPath, {
    primary: primary,
    secondary: secondary
  })), /*#__PURE__*/React.createElement("div", {
    className: "gb-card-head"
  }, /*#__PURE__*/React.createElement(__ds_scope.CategoryIcon, {
    src: icon,
    size: 42
  }), /*#__PURE__*/React.createElement("h2", {
    className: "gb-card-title"
  }, title)), description ? /*#__PURE__*/React.createElement("p", {
    className: "gb-card-desc"
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    className: "gb-card-stats"
  }, words, " Words ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-date)'
    }
  }, "|"), " Read Time: ", readTime, "min"));
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/listing/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/listing/CategoryTile.jsx
try { (() => {
function CategoryTile({
  name,
  count,
  icon,
  image,
  href = '#',
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "gb-tile",
    href: href,
    onClick: onClick ? e => {
      e.preventDefault();
      onClick();
    } : undefined
  }, image ? /*#__PURE__*/React.createElement("img", {
    className: "gb-tile-bg",
    src: image,
    alt: ""
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "gb-tile-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gb-tile-name"
  }, /*#__PURE__*/React.createElement(__ds_scope.CategoryIcon, {
    src: icon,
    size: 22
  }), name), count != null ? /*#__PURE__*/React.createElement("span", {
    className: "gb-tile-count"
  }, count, " \u7BC7") : null));
}
Object.assign(__ds_scope, { CategoryTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/listing/CategoryTile.jsx", error: String((e && e.message) || e) }); }

// components/listing/GroupDivider.jsx
try { (() => {
function GroupDivider({
  label,
  id
}) {
  return /*#__PURE__*/React.createElement("h2", {
    className: "gb-divider",
    id: id
  }, label);
}
Object.assign(__ds_scope, { GroupDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/listing/GroupDivider.jsx", error: String((e && e.message) || e) }); }

// components/listing/PageTitle.jsx
try { (() => {
function PageTitle({
  children,
  image,
  style
}) {
  return /*#__PURE__*/React.createElement("h1", {
    className: "gb-page-title is-page",
    style: style
  }, image ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "gb-sr-only"
  }, children)) : children);
}
Object.assign(__ds_scope, { PageTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/listing/PageTitle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
function NavItem({
  icon,
  label,
  href = '#',
  active = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "gb-nav-item",
    href: href,
    "aria-current": active ? 'page' : undefined,
    onClick: onClick ? e => {
      e.preventDefault();
      onClick();
    } : undefined
  }, /*#__PURE__*/React.createElement("i", {
    className: icon,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function Pagination({
  page = 1,
  total = 1,
  onChange
}) {
  const go = p => e => {
    e.preventDefault();
    if (p >= 1 && p <= total && onChange) onChange(p);
  };
  const pages = Array.from({
    length: total
  }, (_, i) => i + 1);
  return /*#__PURE__*/React.createElement("nav", {
    className: "gb-pager",
    "aria-label": "\u5206\u9801"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: page <= 1 ? 'is-disabled' : '',
    onClick: go(page - 1),
    "aria-label": "\u4E0A\u4E00\u9801"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-left-s-line"
  })), pages.map(p => /*#__PURE__*/React.createElement("a", {
    key: p,
    href: "#",
    "aria-current": p === page ? 'page' : undefined,
    onClick: go(p)
  }, p)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: page >= total ? 'is-disabled' : '',
    onClick: go(page + 1),
    "aria-label": "\u4E0B\u4E00\u9801"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-right-s-line"
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SeriesTree.jsx
try { (() => {
// Obsidian-style file tree for ONE level-1 category: title row → level-2 folders → posts.
function SeriesTree({
  title,
  onTitleClick,
  active = false,
  groups = [],
  activeSlug,
  onSelect,
  emptyLabel = '尚無文章'
}) {
  const owner = groups.find(g => g.posts.some(p => p.slug === activeSlug));
  const [open, setOpen] = React.useState(() => new Set(owner ? [owner.name] : []));
  React.useEffect(() => {
    if (owner) setOpen(s => s.has(owner.name) ? s : new Set([...s, owner.name]));
  }, [activeSlug]);
  const toggle = n => setOpen(s => {
    const t = new Set(s);
    t.has(n) ? t.delete(n) : t.add(n);
    return t;
  });
  return /*#__PURE__*/React.createElement("nav", {
    className: "gb-series",
    "aria-label": title + ' 文章列表'
  }, /*#__PURE__*/React.createElement("a", {
    className: 'gb-series-title' + (active ? ' is-active' : ''),
    href: "#",
    onClick: e => {
      e.preventDefault();
      onTitleClick && onTitleClick();
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    className: "gb-series-list"
  }, groups.map(g => {
    const isOpen = open.has(g.name);
    return /*#__PURE__*/React.createElement("li", {
      key: g.name
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: 'gb-series-folder' + (isOpen ? ' is-open' : ''),
      "aria-expanded": isOpen,
      onClick: () => toggle(g.name)
    }, /*#__PURE__*/React.createElement("i", {
      className: "ri-arrow-right-s-line",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", null, g.name)), isOpen ? /*#__PURE__*/React.createElement("ul", {
      className: "gb-series-posts"
    }, g.posts.length === 0 ? /*#__PURE__*/React.createElement("li", {
      className: "gb-series-empty"
    }, emptyLabel) : g.posts.map(p => /*#__PURE__*/React.createElement("li", {
      key: p.slug
    }, /*#__PURE__*/React.createElement("a", {
      className: 'gb-series-post' + (p.slug === activeSlug ? ' is-active' : ''),
      href: "#",
      "aria-current": p.slug === activeSlug ? 'page' : undefined,
      onClick: e => {
        e.preventDefault();
        onSelect && onSelect(p);
      }
    }, p.title)))) : null);
  })));
}
Object.assign(__ds_scope, { SeriesTree });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SeriesTree.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TableOfContents.jsx
try { (() => {
function List({
  items,
  activeId,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("ol", null, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.id,
    className: 'lv' + it.level
  }, /*#__PURE__*/React.createElement("a", {
    href: '#' + it.id,
    "aria-current": activeId === it.id ? 'true' : undefined,
    onClick: onSelect ? e => {
      e.preventDefault();
      onSelect(it.id);
    } : undefined
  }, it.text))));
}
function TableOfContents({
  items = [],
  activeId,
  onSelect,
  variant = 'sidebar',
  label = '目錄'
}) {
  if (variant === 'mobile') {
    return /*#__PURE__*/React.createElement("details", {
      className: "gb-toc-mobile"
    }, /*#__PURE__*/React.createElement("summary", null, label, /*#__PURE__*/React.createElement("i", {
      className: "ri-arrow-right-s-line",
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement("nav", {
      className: "gb-toc",
      style: {
        position: 'static',
        width: 'auto'
      }
    }, /*#__PURE__*/React.createElement(List, {
      items: items,
      activeId: activeId,
      onSelect: onSelect
    })));
  }
  return /*#__PURE__*/React.createElement("nav", {
    className: "gb-toc",
    "aria-label": label
  }, /*#__PURE__*/React.createElement(List, {
    items: items,
    activeId: activeId,
    onSelect: onSelect
  }));
}
Object.assign(__ds_scope, { TableOfContents });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TableOfContents.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ThemeToggle.jsx
try { (() => {
function ThemeToggle({
  theme = 'dark',
  onToggle,
  ghost = false,
  bare = false
}) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'gb-icon-btn' + (ghost ? ' is-ghost' : '') + (bare ? ' is-bare' : ''),
    "aria-label": next === 'light' ? '切換到淺色模式' : '切換到深色模式',
    onClick: () => onToggle && onToggle(next)
  }, /*#__PURE__*/React.createElement("i", {
    className: theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line',
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
const NAV_ITEMS = [{
  key: 'articles',
  label: 'Articles',
  icon: 'ri-article-line'
}, {
  key: 'about',
  label: 'About Me',
  icon: 'ri-user-3-line'
}, {
  key: 'categories',
  label: 'Categories',
  icon: 'ri-folder-open-line'
}, {
  key: 'archives',
  label: 'Archives',
  icon: 'ri-archive-line'
}];
function Sidebar({
  active = 'articles',
  onNavigate,
  theme = 'dark',
  onToggleTheme,
  showThemeToggle = false,
  titleImage,
  tagline = '心之所向，身之所往。',
  siteName = "Gino's Blog",
  children
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "gb-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-brand-row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "gb-site-title",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('articles');
    }
  }, titleImage ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: titleImage,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "gb-sr-only"
  }, siteName)) : siteName), showThemeToggle && /*#__PURE__*/React.createElement(__ds_scope.ThemeToggle, {
    theme: theme,
    onToggle: onToggleTheme,
    bare: true
  })), /*#__PURE__*/React.createElement("p", {
    className: "gb-tagline"
  }, tagline)), /*#__PURE__*/React.createElement("nav", {
    className: "gb-nav",
    "aria-label": "\u4E3B\u8981\u5C0E\u89BD"
  }, NAV_ITEMS.map(it => /*#__PURE__*/React.createElement(__ds_scope.NavItem, {
    key: it.key,
    icon: it.icon,
    label: it.label,
    active: active === it.key,
    onClick: onNavigate ? () => onNavigate(it.key) : undefined,
    href: '#' + it.key
  }))), children);
}
Object.assign(__ds_scope, { NAV_ITEMS, Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MobileTopBar.jsx
try { (() => {
// <768px: sticky top bar + left slide-in drawer (brand, tagline, nav, children e.g. <SeriesTree>).
function MobileTopBar({
  active = 'articles',
  onNavigate,
  theme = 'dark',
  onToggleTheme,
  showThemeToggle = false,
  siteName = "Gino's Blog",
  tagline = '心之所向，身之所往。',
  defaultOpen = false,
  titleImage,
  children
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const go = k => {
    setOpen(false);
    onNavigate && onNavigate(k);
  };
  // any link inside the drawer navigates → close; folder toggles are buttons and keep it open
  const closeOnLink = e => {
    if (e.target.closest && e.target.closest('a')) setOpen(false);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "gb-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gb-icon-btn is-ghost",
    "aria-label": "\u958B\u555F\u5C0E\u89BD\u9078\u55AE",
    "aria-expanded": open,
    "aria-controls": "gb-drawer",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-menu-line",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("a", {
    className: "gb-site-title",
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('articles');
    }
  }, titleImage ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: titleImage,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "gb-sr-only"
  }, siteName)) : siteName)), showThemeToggle && /*#__PURE__*/React.createElement(__ds_scope.ThemeToggle, {
    theme: theme,
    onToggle: onToggleTheme,
    ghost: true
  })), /*#__PURE__*/React.createElement("div", {
    className: 'gb-drawer-scrim' + (open ? ' is-open' : ''),
    onClick: () => setOpen(false),
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("aside", {
    id: "gb-drawer",
    className: 'gb-drawer' + (open ? ' is-open' : ''),
    "aria-hidden": !open,
    inert: open ? undefined : '',
    onClickCapture: closeOnLink
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gb-brand-row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "gb-site-title",
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('articles');
    }
  }, titleImage ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: titleImage,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "gb-sr-only"
  }, siteName)) : siteName), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "gb-icon-btn is-bare",
    "aria-label": "\u95DC\u9589\u5C0E\u89BD\u9078\u55AE",
    onClick: () => setOpen(false),
    style: {
      top: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-close-line",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "gb-tagline"
  }, tagline)), /*#__PURE__*/React.createElement("nav", {
    className: "gb-nav",
    "aria-label": "\u4E3B\u8981\u5C0E\u89BD"
  }, __ds_scope.NAV_ITEMS.map(it => /*#__PURE__*/React.createElement(__ds_scope.NavItem, {
    key: it.key,
    icon: it.icon,
    label: it.label,
    active: active === it.key,
    onClick: () => go(it.key)
  }))), children));
}
Object.assign(__ds_scope, { MobileTopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MobileTopBar.jsx", error: String((e && e.message) || e) }); }

// scraps/dev-bundle.js
try { (() => {
// DEV ONLY: emulates _ds_bundle.js before the compiler has run (for local screenshots).
(function () {
  const base = document.currentScript.getAttribute('data-base') || '../';
  const files = ['navigation/NavItem', 'navigation/ThemeToggle', 'navigation/Sidebar', 'navigation/MobileTopBar', 'navigation/TableOfContents', 'navigation/Pagination', 'listing/PageTitle', 'listing/CategoryIcon', 'listing/CategoryPath', 'listing/ArticleCard', 'listing/CategoryTile', 'listing/GroupDivider', 'listing/ArchiveList', 'content/Callout', 'content/Aside', 'content/Reference', 'content/MarkerList', 'content/CodeBlock', 'content/Figure', 'content/Table', 'content/Ruby', 'content/Tex', 'interactive/Tabs', 'interactive/Slider', 'interactive/Carousel', 'interactive/LinkCard', 'interactive/Staff', 'about/ItemCard', 'about/ItemCards', 'about/Person', 'about/People'];
  const NS = window.GinoSBlogDesignSystem_e90488 = window.GinoSBlogDesignSystem_e90488 || {};
  for (const f of files) {
    const x = new XMLHttpRequest();
    x.open('GET', base + 'components/' + f + '.jsx', false);
    x.send();
    let src = x.responseText.replace(/^import .*$/mg, '');
    const names = [...src.matchAll(/export (?:function|const) (\w+)/g)].map(m => m[1]);
    src = src.replace(/export (function|const) /g, '$1 ');
    const code = Babel.transform(src, {
      presets: ['react']
    }).code;
    const out = new Function('NS', 'React', 'with(NS){' + code + '\nreturn {' + names.join(',') + '};}')(NS, React);
    Object.assign(NS, out);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "scraps/dev-bundle.js", error: String((e && e.message) || e) }); }

// ui_kits/blog/DotGraph.jsx
try { (() => {
// Renders a ```dot fence with viz.js (CDN). Falls back to the DOT source.
const VIZ_SRC = 'https://cdn.jsdelivr.net/npm/@viz-js/viz@3.11.0/lib/viz-standalone.js';
let vizPromise = null;
function loadViz() {
  if (!vizPromise) vizPromise = new Promise((res, rej) => {
    if (window.Viz) return res(window.Viz.instance());
    const s = document.createElement('script');
    s.src = VIZ_SRC;
    s.onload = () => res(window.Viz.instance());
    s.onerror = rej;
    document.head.appendChild(s);
  });
  return vizPromise;
}
function DotGraph({
  dot,
  maxWidth = 520
}) {
  const ref = React.useRef(null);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    loadViz().then(viz => {
      if (!alive || !ref.current) return;
      const svg = viz.renderSVGElement(dot);
      svg.style.maxWidth = '100%';
      svg.style.height = 'auto';
      ref.current.replaceChildren(svg);
    }).catch(() => setFailed(true));
    return () => {
      alive = false;
    };
  }, [dot]);
  if (failed) {
    const {
      CodeBlock
    } = window.GinoSBlogDesignSystem_e90488;
    return /*#__PURE__*/React.createElement(CodeBlock, {
      lang: "dot",
      code: dot
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'flex',
      justifyContent: 'center',
      margin: '1.2em auto',
      maxWidth,
      minHeight: 80
    }
  });
}
window.DotGraph = DotGraph;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/DotGraph.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/PostCache.jsx
try { (() => {
// Post body: Computer Organization / Cache / 01 Cache Fundamentals.md
function PostCache() {
  const {
    Callout,
    MarkerList,
    CodeBlock,
    Figure
  } = window.GinoSBlogDesignSystem_e90488;
  const ascii = `+------------------------------------------------------------+
|                       ONE CACHE LINE                       |
+-----------------------------------------+------------------+
|              Control Metadata           |   Data Payload   |
+---+---+-------------+-------------------+------------------+
| Valid | Dirty | Replacement |   Tag     |    Data Field    |
|  bit  |  bit  | (for LRU)   | (20~40 b) |   (64 B / 512b)  |
+-------+-------+-------------+-----------+------------------+
|   1   |   0   |    0b10     | 0x7F...EF | [B0][B1]...[B63] |
+-------+-------+-------------+-----------+------------------+`;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "Cache\uFF08\u5FEB\u53D6\uFF09\uFF1A\u4E00\u7A2E\u9AD8\u901F\u7684\u66AB\u5B58\u8CC7\u6599\u5132\u5B58\u5C64\uFF0C\u628A CPU \u5E38\u7528\u7684\u3001\u6700\u8FD1\u8B80\u904E\u7684\u3001\u7B97\u904E\u7684\u8CC7\u6599\u7559\u4E00\u4EFD\u5728\u66F4\u65B9\u4FBF\u53D6\u5F97\u7684\u5730\u65B9\uFF0C\u7576 CPU \u4E0B\u6B21\u9700\u8981\u6642\u4FBF\u80FD\u5FEB\u901F\u62FF\u4F86\u4F7F\u7528\u3002"), /*#__PURE__*/React.createElement("p", null, "Cache \u662F\u4F4D\u5728 Register \u4E0B\u4E00\u968E\u7684\u8A18\u61B6\u55AE\u5143\u3002"), /*#__PURE__*/React.createElement("h2", {
    id: "h-cache-work"
  }, "Cache \u7684\u5927\u81F4\u5DE5\u4F5C\u539F\u7406"), /*#__PURE__*/React.createElement("p", null, "\u4E00\u689D Cache Line \u7684\u7D50\u69CB\u5927\u81F4\u5982\u4E0B\uFF1A"), /*#__PURE__*/React.createElement(CodeBlock, {
    code: ascii
  }), /*#__PURE__*/React.createElement("p", null, "Data Payload \u4E00\u5171\u6709 64 Bytes\uFF08Memory Block \u4E5F\u662F\u9019\u500B\u5927\u5C0F\uFF0C\u65B9\u4FBF\u5C0D\u61C9\uFF09\uFF0CControl Metadata \u5247\u662F\u5B58 Cache \u7CFB\u7D71\u904B\u4F5C\u6642\u9700\u8981\u7684\u8CC7\u8A0A\uFF1A"), /*#__PURE__*/React.createElement(MarkerList, {
    items: [{
      marker: 'i',
      content: 'Tag Field：存放高位的記憶體位址，用來確認目前存的是哪個 Memory Block 的資料'
    }, {
      marker: 'k',
      content: 'Valid bit：標記此資料是否有效（無過期）'
    }, {
      marker: 'k',
      content: 'Dirty bit：標記此資料是否被修改過、尚未寫回 DRAM'
    }, {
      marker: 'k',
      content: 'Replacement bit：用於 replacement policy'
    }]
  }), /*#__PURE__*/React.createElement("h2", {
    id: "h-hierarchy"
  }, "Cache Hierarchy"), /*#__PURE__*/React.createElement("p", null, "L1, L2 Cache \u662F\u9577\u5728\u6BCF\u500B CPU Core \u88E1\u9762\uFF0C\u5176\u4E2D L1 Cache \u53C8\u5206\u6210 Instruction Cache (I-Cache)\u3001Data Cache (D-Cache)\u3002"), /*#__PURE__*/React.createElement(Callout, {
    type: "notes",
    title: "\u5176\u4ED6 units \u4ECB\u7D39"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "ALU: Arithmetic Logic Unit"), /*#__PURE__*/React.createElement("li", null, "FPU: Floating-Point Unit"), /*#__PURE__*/React.createElement("li", null, "LSU: Load/Store Unit"), /*#__PURE__*/React.createElement("li", null, "TLB: Translation Lookaside Buffer\uFF0C\u7528\u4F86\u52A0\u901F virtual memory address \u8207 physical memory address \u8F49\u63DB"))), /*#__PURE__*/React.createElement(Figure, {
    src: "../../assets/posts/memory-units-in-a-cpu-core.png",
    alt: "Memory Units in a CPU Core",
    center: true,
    width: 400
  }), /*#__PURE__*/React.createElement("p", null, "L3 Cache \u662F\u540C\u4E00\u500B CPU \u5167\u6240\u6709 core \u4E00\u8D77\u5171\u7528\u3002"), /*#__PURE__*/React.createElement(Figure, {
    src: "../../assets/posts/memory-units.png",
    alt: "Memory Units"
  }), /*#__PURE__*/React.createElement("p", null, "\u8FD1\u4EE3\u6709\u4E9B\u7CFB\u7D71\uFF08\u4F8B\u5982 IBM \u5927\u578B\u4E3B\u6A5F zSystems\u3001\u8D85\u7D1A\u96FB\u8166 Intel Xeon Phi/Max\u3001SoC \u6676\u7247\u5982 Apple Silicon\uFF09\u6703\u6709\u985E\u4F3C\u300CL4 Cache\u300D\u4E4B\u985E\u7684\u6771\u897F\uFF0C\u4F9B CPU\u3001GPU\u3001NPU \u7B49\u55AE\u5143\u5171\u4EAB\uFF0C\u6216\u662F\u8DE8\u7BC0\u9EDE\u5171\u4EAB\u3002"), /*#__PURE__*/React.createElement("h2", {
    id: "h-locality"
  }, "Principle of Locality"), /*#__PURE__*/React.createElement("p", null, "\u6EFF\u591A\u7A0B\u5F0F\u90FD\u6703\u6709 locality \u7684\u7279\u6027\uFF0C\u800C cache \u7684\u51FA\u73FE\u80FD\u5584\u52A0\u5229\u7528\u9019\u7A2E\u7279\u6027\uFF0C\u5927\u5E45\u63D0\u5347\u7A0B\u5F0F\u57F7\u884C\u6548\u7387\u3002"), /*#__PURE__*/React.createElement(MarkerList, {
    items: [{
      marker: 'p',
      content: 'Temporal Locality：如果一個位址被 access，那麼短時間內會再被 access 數次。'
    }, {
      marker: 'i',
      content: '例：loop'
    }]
  }), /*#__PURE__*/React.createElement(CodeBlock, {
    lang: "cpp",
    code: 'for (int i = 0; i < n; i++) {\n\tfor (int j = 0; j < 10; j++) {\n\t\tsum += arr[j];\n\t}\n}'
  }), /*#__PURE__*/React.createElement(MarkerList, {
    items: [{
      marker: 'p',
      content: 'Spatial Locality：指存取位址的 pattern 具有規律。如果一個位址被 access，那麼它附近的、與之相關的位址有可能接下來會被 access 到。'
    }, {
      marker: 'i',
      content: '例：sequential scan'
    }]
  }), /*#__PURE__*/React.createElement(CodeBlock, {
    lang: "cpp",
    code: "for (int i = 0; i < 1'000'000; i++) {\n\tsum += arr[i];\n}"
  }), /*#__PURE__*/React.createElement("h2", {
    id: "h-questions"
  }, "Questions"), /*#__PURE__*/React.createElement("h3", {
    id: "h-tf"
  }, "True or False"), /*#__PURE__*/React.createElement(MarkerList, {
    items: [{
      marker: 'p',
      content: 'Caches take advantage of temporal locality.'
    }, {
      marker: 'c',
      content: 'On a read, the value returned depends on which blocks are in the cache.'
    }, {
      marker: 'p',
      content: 'Most of the cost of the memory hierarchy is at the highest level.'
    }, {
      marker: 'p',
      content: 'Most of the capacity of the memory hierarchy is at the lowest level.'
    }]
  }));
}
window.PostCache = PostCache;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/PostCache.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/PostMatching.jsx
try { (() => {
// Post body: Discrete Mathematics / Graph Theory / 3-6 1-factor (aka. Perfect Matching).md
function PostMatching() {
  const {
    Callout,
    Figure,
    Tex
  } = window.GinoSBlogDesignSystem_e90488;
  const t = (s, ...v) => /*#__PURE__*/React.createElement(Tex, {
    tex: String.raw(s, ...v)
  });
  const td = (s, ...v) => /*#__PURE__*/React.createElement(Tex, {
    display: true,
    tex: String.raw(s, ...v)
  });
  const DotGraph = window.DotGraph;
  const tree = `graph G {
  bgcolor="transparent";
  node [shape=circle, style=filled, fontname="Helvetica", fontsize=12, width=0.4, fixedsize=true, penwidth=0.5];
  edge [color="#888780", penwidth=1];
  node [fillcolor="#9FE1CB", color="#0F6E56", fontcolor="#04342C"];
  subgraph cluster_r  { label=""; style="dashed,rounded"; color="#1D9E75"; r; }
  subgraph cluster_B  { label="花"; fontcolor="#888780"; style="dashed,rounded"; color="#1D9E75"; b; c; d; { rank=same; c; d; } }
  subgraph cluster_o2 { label=""; style="dashed,rounded"; color="#1D9E75"; o2 [label="o₂"]; }
  subgraph cluster_o3 { label=""; style="dashed,rounded"; color="#1D9E75"; o3 [label="o₃"]; }
  node [fillcolor="#F5C4B3", color="#993C1D", fontcolor="#4A1B0C"];
  i1 [label="i₁"]; i2 [label="i₂"]; i3 [label="i₃"];
  r -- i1; r -- i2; i1 -- b [penwidth=4]; b -- c; b -- d; c -- d [penwidth=4]; i2 -- o2 [penwidth=4]; d -- i3; i3 -- o3 [penwidth=4];
}`;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Callout, {
    type: "note",
    title: "Factor"
  }, /*#__PURE__*/React.createElement("p", null, "Factor \u5C31\u662F spanning subgraph\u3002")), /*#__PURE__*/React.createElement(Callout, {
    type: "note",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, t`k`, "-factor")
  }, /*#__PURE__*/React.createElement("p", null, t`k`, "-factor\uFF1A", t`k`, "-regular \u7684 factor"), /*#__PURE__*/React.createElement("p", null, "\u4F8B\u5982 2-factor \u5C31\u662F\u4E00\u5806\u74B0\u3002")), /*#__PURE__*/React.createElement(Callout, {
    type: "note",
    title: "1-factor"
  }, /*#__PURE__*/React.createElement("p", null, "1-factor \u5C31\u662F\u5B8C\u7F8E\u5339\u914D\uFF08perfect matching\uFF09\u3002", /*#__PURE__*/React.createElement("br", null), "\u56E0\u6B64\u4E00\u5F35\u5716 ", t`G`, " \u5982\u679C\u6709\u5947\u6578\u500B\u9EDE\u5247\u4E0D\u5B58\u5728 1-factor\u3002"), /*#__PURE__*/React.createElement("p", null, "\u8A3B\uFF1A\u6B63\u5F0F\u5730\u8AAA\uFF0Cperfect matching \u662F\u4E00\u7D44\u908A\u96C6\uFF0C1-factor \u662F\u5B50\u5716\uFF0C\u4E0D\u592A\u4E00\u6A23\uFF0C\u4F46\u70BA\u4E86\u65B9\u4FBF\u601D\u8003\u6240\u4EE5\u66AB\u6642\u7576\u505A 1-factor ", t`\equiv`, " perfect matching\u3002")), /*#__PURE__*/React.createElement(Callout, {
    type: "question"
  }, /*#__PURE__*/React.createElement("p", null, "\u5B8C\u5168\u5716 ", t`K_{2n}`, " \u6709\u5E7E\u7D44\u5B8C\u7F8E\u5339\u914D\uFF1F")), /*#__PURE__*/React.createElement("p", null, "\u4EE4 ", t`P = (a_1, a_2, \cdots, a_{2n})`, " \u662F ", t`1 \sim 2n`, " \u7684 permutation\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5C07 ", t`P`, " \u5169\u5169\u5143\u7D20\u4E00\u7D44\uFF1A", t`(a_1, a_2), (a_3, a_4), \cdots`, " \u9019\u7A2E\u5206\u7D44\u65B9\u5F0F\u4E00\u5B9A\u662F\u5408\u6CD5\u7684\u5339\u914D\uFF08\u4E14\u5B8C\u7F8E\uFF09\u3002"), /*#__PURE__*/React.createElement("p", null, t`P`, " \u6709 ", t`(2n)!`, " \u7A2E\u6392\u5217\u65B9\u5F0F\u3002", /*#__PURE__*/React.createElement("br", null), "\u56E0\u70BA\u7D44\u5167\u5143\u7D20\u9806\u5E8F\u4E0D\u91CD\u8981\uFF0C\u6240\u4EE5\u9664\u4EE5 ", t`(2!)^n`, /*#__PURE__*/React.createElement("br", null), "\u56E0\u70BA\u7D44\u8207\u7D44\u4E4B\u9593\u7684\u9806\u5E8F\u4E0D\u91CD\u8981\uFF0C\u6240\u4EE5\u9664\u4EE5 ", t`n!`), /*#__PURE__*/React.createElement("p", null, "\u7B54\u6848\uFF1A", t`\dfrac{(2n)!}{2^n \cdot n!}`), /*#__PURE__*/React.createElement("h2", {
    id: "h-tutte"
  }, "Tutte's 1-factor Theorem"), /*#__PURE__*/React.createElement(Callout, {
    type: "note",
    title: t`o(G)`
  }, /*#__PURE__*/React.createElement("p", null, "\u5B9A\u7FA9 ", t`o(G) :=`, " ", t`G`, " \u7684 odd components \u500B\u6578\u3002"), /*#__PURE__*/React.createElement(Figure, {
    src: "../../assets/posts/o-g-example.png",
    alt: "o(G) example"
  })), /*#__PURE__*/React.createElement(Callout, {
    type: "success",
    title: "Tutte's 1-factor Theorem"
  }, /*#__PURE__*/React.createElement("p", null, "\u5716 ", t`G`, " \u5B58\u5728\u5B8C\u7F8E\u5339\u914D\uFF08aka. 1-factor\uFF09 ", t`\iff`, " ", t`\forall S \subseteq V(G)`, ", ", t`o(G - S) \le |S|`)), /*#__PURE__*/React.createElement("h3", {
    id: "h-tutte-proof"
  }, "Proof"), /*#__PURE__*/React.createElement("p", null, "(", t`\Rightarrow`, ") \u5148\u628A\u5716\u5927\u6982\u634F\u6210\u9019\u7A2E\u5F62\u72C0\uFF1A"), /*#__PURE__*/React.createElement(Figure, {
    src: "../../assets/posts/tutte-theorem-proof.png",
    alt: "tutte theorem proof",
    center: true,
    width: 450
  }), /*#__PURE__*/React.createElement("p", null, "\u5716 ", t`G`, " \u5207\u6389 ", t`S`, " \u4E4B\u5F8C\uFF0C\u6709 ", t`o(G - S)`, " \u500B odd components\u3002", /*#__PURE__*/React.createElement("br", null), "\u9019 ", t`o(G - S)`, " \u500B odd components \u7121\u8AD6\u5982\u4F55\u90FD\u4E00\u5B9A\u6703\u6709\u81F3\u5C11 ", t`1`, " \u500B\u4EBA\u843D\u55AE\uFF0C\u56E0\u70BA\u9019\u4E9B odd components \u53EA\u8DDF ", t`S`, " \u9023\u63A5\uFF0C\u9019\u4E9B\u4EBA\u5F97\u9760 ", t`S`, " \u4F86\u62EF\u6551\uFF08\u5426\u5247\u5C31\u6C92\u8FA6\u6CD5\u6709\u5B8C\u7F8E\u5339\u914D\u4E86\uFF09\u3002"), /*#__PURE__*/React.createElement("p", null, "\u6545 ", t`S`, " \u81F3\u5C11\u8981\u6709 ", t`o(G - S)`, " \u500B\u6210\u54E1\uFF0C\u4E14\u4EFB\u610F\u53D6\u51FA\u4F86\u7684 ", t`S`, " \u90FD\u8981\u9075\u5B88\uFF08\u9019\u662F\u4E0B\u754C\uFF09\u3002"), /*#__PURE__*/React.createElement("p", null, "(", t`\Leftarrow`, ") West \u539F\u6587\u66F8\u7684\u8B49\u660E\u6211\u770B\u4E0D\u592A\u61C2\uFF0C\u6240\u4EE5\u5F9E\u7E2E\u82B1\u6F14\u7B97\u6CD5\u7684\u89D2\u5EA6\u4F86\u7406\u89E3\uFF0C\u800C\u4E14\u9084\u80FD\u9806\u5E36\u770B\u51FA\u70BA\u4EC0\u9EBC\u9019\u500B\u5B9A\u7406\u7684 corollary \u53EF\u4EE5\u63A8\u51FA Hall's Theorem\u3002"), /*#__PURE__*/React.createElement("p", null, "Prerequisite\uFF1A", /*#__PURE__*/React.createElement("a", {
    href: "https://oi-wiki.org/graph/graph-matching/general-match/"
  }, "Edmond's Blossom Algorithm"), "\uFF0C\u7528\u65BC\u6C42\u4E00\u822C\u5716\u7684\u6700\u5927\u5339\u914D\u3002"), /*#__PURE__*/React.createElement("p", null, "\u5229\u7528\u9019\u500B\u6F14\u7B97\u6CD5\u4F86\u8B49\u7684\u8A71\uFF0C\u6211\u5011\u6539\u8B49 contrapositive\uFF1A"), /*#__PURE__*/React.createElement("blockquote", null, /*#__PURE__*/React.createElement("p", null, "\u82E5 ", t`G`, " \u6C92\u6709\u5B8C\u7F8E\u5339\u914D\uFF0C\u5247\u5B58\u5728 ", t`S`, " \u4F7F ", t`o(G - S) > |S|`, "\u3002")), /*#__PURE__*/React.createElement("p", null, "\u53D6\u6700\u5927\u5339\u914D ", t`M`, "\u3002\u56E0\u70BA\u6C92\u6709\u5B8C\u7F8E\u5339\u914D\uFF0C\u4E00\u5B9A\u6709\u9EDE\u843D\u55AE\uFF0C\u4EE4\u5176\u4E2D\u4E00\u500B\u70BA ", t`r`, "\u3002", /*#__PURE__*/React.createElement("br", null), "\u5F9E ", t`r`, " \u51FA\u767C\u505A\u7E2E\u82B1\u6F14\u7B97\u6CD5\uFF0C\u6703\u9577\u51FA\u4E00\u68F5\u4EA4\u932F\u6A39\uFF0C\u4E0B\u5716\u70BA\u505A\u5B8C BFS/DFS \u4E4B\u5F8C\u9019\u68F5\u4EA4\u932F\u6A39\u7684\u9577\u76F8\u793A\u610F\u5716\uFF1A"), /*#__PURE__*/React.createElement(DotGraph, {
    dot: tree,
    maxWidth: 260
  }), /*#__PURE__*/React.createElement("p", null, "\u7C97\u908A\u70BA\u5339\u914D\u908A\uFF1B\u7DA0\u8272\u70BA o \u9EDE\uFF0C\u6A58\u8272\u70BA i \u9EDE\uFF0C\u865B\u7DDA\u6846\u70BA o \u584A\uFF08\u5C31\u662F\u82B1\uFF09\u3002", /*#__PURE__*/React.createElement("br", null), "\u9019\u68F5\u4EA4\u932F\u6A39\u6703\u5F9E o \u9EDE\u5F80\u4E0B\u8D70\u672A\u5339\u914D\u908A\u5230 i \u9EDE\uFF0C\u5F9E i \u9EDE\u5F80\u4E0B\u8D70\u5339\u914D\u908A\u5230 o \u9EDE\u3002"), /*#__PURE__*/React.createElement("p", null, "\u56E0\u70BA ", t`M`, " \u5DF2\u7D93\u662F\u6700\u5927\u5339\u914D\uFF0C\u6839\u64DA Berge's Lemma\uFF0C\u9019\u6B21\u641C\u5C0B\u4E00\u5B9A\u627E\u4E0D\u5230\u589E\u5EE3\u8DEF\uFF0C\u6700\u5F8C queue \u6E05\u7A7A\u7D50\u675F\u3002"), /*#__PURE__*/React.createElement("h4", {
    id: "h-obs"
  }, "Observations"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, "i \u9EDE\u7684\u5C0F\u5B69\u4E00\u5B9A\u6709\u4E14\u53EA\u6709\u4E00\u500B\uFF0C\u4E5F\u5C31\u662F\u8DDF\u5B83\u5339\u914D\u7684 o \u584A\u3002"), /*#__PURE__*/React.createElement("li", null, "o \u584A either \u662F\u5B64\u9EDE or \u82B1\uFF0C\u5169\u8005\u9EDE\u6578\u90FD\u662F\u5947\u6578", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u5982\u679C\u51FA\u73FE\u5DE2\u72C0\u7684\u82B1\uFF1A\u4E00\u6A23\u9EDE\u6578\u662F\u5947\u6578\uFF0C\u56E0\u70BA\u5947\u6578\u500B\u300C\u9EDE\u300D\u7D44\u6210\u7684\u74B0\u3001\u6BCF\u500B\u300C\u9EDE\u300D\u53C8\u662F\u5947\u6578\u500B\u9EDE\uFF0C\u52A0\u8D77\u4F86\u9084\u662F\u5947\u6578\u3002"))), /*#__PURE__*/React.createElement("li", null, "\u6839\u6240\u5728\u7684 o \u584A\uFF08\u53EF\u80FD\u5C31\u662F ", t`r`, "\uFF0C\u4E5F\u53EF\u80FD\u662F\u5305\u542B ", t`r`, " \u7684\u82B1\uFF09\u662F", /*#__PURE__*/React.createElement("strong", null, "\u552F\u4E00\u6C92\u6709\u8DDF i \u9EDE\u5339\u914D\u7684 o \u584A"), "\u3002"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u4E0D\u540C\u7684 o \u584A\u4E4B\u9593\u6C92\u6709\u908A\uFF0Co \u584A\u4E5F\u6C92\u6709\u908A\u9023\u5230 ", t`T`, " \u4EE5\u5916\u7684\u9EDE"), "\uFF1A", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u9023\u5230 ", t`T`, " \u5916\u7684\u843D\u55AE\u9EDE \u2192 \u627E\u5230\u589E\u5EE3\u8DEF\uFF0C\u77DB\u76FE"), /*#__PURE__*/React.createElement("li", null, "\u9023\u5230 ", t`T`, " \u5916\u7684\u5DF2\u5339\u914D\u9EDE \u2192 \u6A39\u9084\u80FD\u7E7C\u7E8C\u9577\uFF0C\u641C\u5C0B\u9084\u6C92\u7D50\u675F\uFF0C\u77DB\u76FE"), /*#__PURE__*/React.createElement("li", null, "\u9023\u5230\u53E6\u4E00\u500B o \u584A \u2192 \u6703\u5F62\u6210\u65B0\u7684\u82B1\u4E26\u88AB\u7E2E\u6389\uFF0C\u641C\u5C0B\u9084\u6C92\u7D50\u675F\uFF0C\u77DB\u76FE")))), /*#__PURE__*/React.createElement("h4", {
    id: "h-build-s"
  }, "\u69CB\u9020 ", t`S`), /*#__PURE__*/React.createElement("p", null, "\u53D6 ", t`S = \{T \text{ 上的 i 點}\}`, "\u3002"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u7531 1\u30013\uFF0Ci \u9EDE\u548C\u6839\u4EE5\u5916\u7684 o \u584A\u900F\u904E\u5339\u914D\u4E00\u4E00\u5C0D\u61C9\uFF0C\u6240\u4EE5 o \u584A\u500B\u6578 ", t`= |S| + 1`, "\u3002"), /*#__PURE__*/React.createElement("li", null, "\u7531 4\uFF0C\u5207\u6389 ", t`S`, " \u4E4B\u5F8C\uFF0C\u6BCF\u500B o \u584A\u81EA\u5DF1\u5C31\u662F\u4E00\u500B\u9023\u901A\u584A\uFF0C\u4E26\u4E14\u7531 2\uFF0C\u5B83\u662F odd component\u3002")), /*#__PURE__*/React.createElement("p", null, "\u6545 ", t`o(G - S) \ge |S| + 1 > |S|`, "\uFF0C\u9055\u53CD Tutte condition\u3002", t`\blacksquare`), /*#__PURE__*/React.createElement(Callout, {
    type: "example",
    title: "Remark"
  }, /*#__PURE__*/React.createElement("p", null, "\u5982\u679C o \u584A\u5168\u90FD\u662F\u5B64\u9EDE\uFF0C\u9019\u5C31\u662F Hall's Theorem \u7684\u8B49\u660E\u3002"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "i \u9EDE = Hall \u7684 ", t`N(S)`, "\uFF0Co \u9EDE = Hall \u7684 ", t`S`, "\u3002"))), /*#__PURE__*/React.createElement(Callout, {
    type: "example"
  }, /*#__PURE__*/React.createElement(Figure, {
    src: "../../assets/posts/tutte-theorem-example.png",
    alt: "tutte theorem example"
  })), /*#__PURE__*/React.createElement(Callout, {
    type: "question"
  }, /*#__PURE__*/React.createElement("p", null, "\u8B49\u660E\u6C92\u6709\u5272\u908A\u7684 ", t`3`, "-regular graph ", t`\Rightarrow`, " \u6709 ", t`1`, " \u500B ", t`1`, "-factor\u3002")), /*#__PURE__*/React.createElement("p", null, "\u6C92\u6709\u5272\u908A\uFF1A"), /*#__PURE__*/React.createElement(Figure, {
    src: "../../assets/posts/3-regular-no-cut-edge.png",
    alt: "3-regular no cut edge"
  }), /*#__PURE__*/React.createElement("p", null, "\u5982\u679C\u770B odd components ", t`\rightarrow`, " ", t`S`, " \u7684\u908A\u6578\uFF0C\u6703\u767C\u73FE\u81F3\u5C11\u662F ", t`3 \cdot o(G - S)`, /*#__PURE__*/React.createElement("br", null), "\u800C ", t`S`, " \u80FD\u7D66\u51FA\u6700\u591A ", t`3|S|`, " \u689D\u5411\u5916\u9023\u51FA\u53BB\u7684\u908A\uFF0C\u56E0\u6B64\uFF1A"), td`\begin{align*} 3 \cdot o(G - S) \le 3 |S|\\ o(G - S) \le |S| \end{align*}`, /*#__PURE__*/React.createElement("p", null, "\u6EFF\u8DB3 Tutte's condition\uFF0C\u6545 ", t`G`, " \u5B58\u5728\u5B8C\u7F8E\u5339\u914D\u3002"), /*#__PURE__*/React.createElement("h2", {
    id: "h-berge"
  }, "Berge-Tutte Formula"), /*#__PURE__*/React.createElement(Callout, {
    type: "success",
    title: "Berge-Tutte Formula"
  }, /*#__PURE__*/React.createElement("p", null, "\u5047\u8A2D ", t`n`, " \u500B\u9EDE\u7684\u5716 ", t`G`, " \u7684\u6700\u5927\u5339\u914D\u84CB\u51FA\u4F86\u5F8C\u843D\u55AE\u9EDE\u7684\u500B\u6578\u662F ", t`d`, "\uFF0C\u5247\uFF1A"), td`\displaystyle d = \max_{S \subseteq V(G)} ( o(G - S) - |S| )`, /*#__PURE__*/React.createElement("p", null, "\u56E0\u6B64\u5716 ", t`G`, " \u7684\u6700\u5927\u5339\u914D\u5927\u5C0F\u662F\uFF1A"), td`\dfrac{n - d}{2} = \dfrac12 \cdot \min_{S \subseteq V(G)} \{n - o(G - S) + |S|\}`), /*#__PURE__*/React.createElement("h3", {
    id: "h-berge-proof"
  }, "Proof"), /*#__PURE__*/React.createElement("p", null, "\u8A2D ", t`\displaystyle d = \max_{S \subseteq V(G)} (o(G - S) - |S|)`, "\uFF0C\u6B32\u8B49\u660E\u6700\u5927\u5339\u914D\u4E0B\u843D\u55AE\u9EDE\u500B\u6578\u5C31\u662F ", t`d`, "\u3002"), td`d \ge o(G - S) - |S| \ge \bigl(|S| + (n - 2|M|)\bigr) - |S| = n - 2|M| = \text{落單點個數}`);
}
window.PostMatching = PostMatching;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/PostMatching.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/Screens.jsx
try { (() => {
// Gino's Blog UI kit — layout shell + screens
const DS = window.GinoSBlogDesignSystem_e90488;
const D = window.GB_DATA;
function useWidth() {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return w;
}
function seriesFor(cat) {
  const c = D.categories.find(x => x.slug === cat);
  if (!c) return null;
  const posts = D.posts.filter(p => p.primarySlug === cat);
  const coll = new Intl.Collator('en', {
    numeric: true
  });
  const names = [...(D.series[cat] || [])];
  posts.forEach(p => {
    const k = p.secondary || 'Miscellaneous';
    if (!names.includes(k)) names.push(k);
  });
  return {
    title: c.name,
    groups: names.map(n => ({
      name: n,
      posts: posts.filter(p => (p.secondary || 'Miscellaneous') === n).sort((a, b) => coll.compare(a.title, b.title)).map(p => ({
        slug: p.slug,
        title: p.title
      }))
    }))
  };
}
function Shell({
  nav,
  onNavigate,
  wide,
  seriesCat,
  activeSlug,
  onCategory,
  onPost,
  children
}) {
  const w = useWidth();
  const mobile = w < 768;
  const {
    Sidebar,
    MobileTopBar,
    SeriesTree
  } = DS;
  const series = seriesCat ? seriesFor(seriesCat) : null;
  const tree = series ? /*#__PURE__*/React.createElement(SeriesTree, {
    key: seriesCat,
    title: series.title,
    groups: series.groups,
    active: !activeSlug,
    activeSlug: activeSlug,
    onTitleClick: () => onCategory(seriesCat),
    onSelect: p => onPost(p.slug)
  }) : null;
  const footer = /*#__PURE__*/React.createElement("footer", {
    className: "gb-footer"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Gino's Blog"), /*#__PURE__*/React.createElement("span", null, "Built with Astro \xB7 Notes from Obsidian"));
  if (mobile) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(MobileTopBar, {
      active: nav,
      onNavigate: onNavigate,
      titleImage: D.titleImage
    }, tree), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        padding: '24px 16px 0'
      }
    }, children), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px'
      }
    }, footer));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-post)',
      margin: '0 auto',
      padding: '32px 32px 0',
      minHeight: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 'var(--column-gap)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: nav,
    onNavigate: onNavigate,
    titleImage: D.titleImage
  }, tree), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingTop: 16,
      maxWidth: wide ? 'none' : 'var(--prose-max)'
    }
  }, children)), footer);
}
function PostCards({
  posts,
  go
}) {
  const {
    ArticleCard
  } = DS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--card-list-gap)'
    }
  }, posts.map(p => /*#__PURE__*/React.createElement(ArticleCard, {
    key: p.slug,
    date: p.date,
    primary: p.primary,
    secondary: p.secondary,
    title: p.title,
    description: p.description,
    words: p.words,
    readTime: p.readTime,
    icon: (D.categories.find(c => c.slug === p.primarySlug) || {}).icon,
    onClick: () => go({
      page: 'post',
      slug: p.slug
    })
  })));
}
function ArticlesScreen({
  go
}) {
  const {
    PageTitle
  } = DS;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageTitle, {
    style: {
      marginBottom: 32
    }
  }, "Articles"), /*#__PURE__*/React.createElement(PostCards, {
    posts: D.posts,
    go: go
  }));
}
function PostScreen({
  slug,
  go
}) {
  const {
    TableOfContents,
    CategoryPath
  } = DS;
  const w = useWidth();
  const post = D.posts.find(p => p.slug === slug) || D.posts[0];
  const [active, setActive] = React.useState(post.toc[0] && post.toc[0].id);
  const Body = slug === 'perfect-matching' ? window.PostMatching : window.PostCache;
  const sideToc = w >= 1180;
  const jump = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 24,
      behavior: 'smooth'
    });
    setActive(id);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  React.useEffect(() => {
    const f = () => {
      let cur = post.toc[0] && post.toc[0].id;
      for (const it of post.toc) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < 120) cur = it.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', f, {
      passive: true
    });
    return () => window.removeEventListener('scroll', f);
  }, [slug]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      flex: 1,
      minWidth: 0,
      maxWidth: 'var(--prose-max)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      marginBottom: 56,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: w < 768 ? 28 : 'var(--size-post-title)',
      lineHeight: 1.25,
      margin: '0 0 12px',
      textWrap: 'balance'
    }
  }, post.title), /*#__PURE__*/React.createElement("div", {
    className: "gb-card-meta",
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("time", {
    className: "gb-date"
  }, post.date), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer'
    },
    onClick: () => go({
      page: 'category',
      cat: post.primarySlug
    })
  }, /*#__PURE__*/React.createElement(CategoryPath, {
    primary: post.primary,
    secondary: post.secondary
  })))), !sideToc ? /*#__PURE__*/React.createElement(TableOfContents, {
    variant: "mobile",
    items: post.toc,
    activeId: active,
    onSelect: jump
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "gb-prose"
  }, /*#__PURE__*/React.createElement(Body, null))), sideToc ? /*#__PURE__*/React.createElement(TableOfContents, {
    items: post.toc,
    activeId: active,
    onSelect: jump
  }) : null);
}
function CategoriesScreen({
  go
}) {
  const {
    PageTitle,
    CategoryTile
  } = DS;
  const count = slug => D.posts.filter(p => p.primarySlug === slug).length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageTitle, {
    style: {
      marginBottom: 32
    }
  }, "Categories"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
      gap: 16
    }
  }, D.categories.map(c => /*#__PURE__*/React.createElement(CategoryTile, {
    key: c.slug,
    name: c.name,
    count: count(c.slug),
    icon: c.icon,
    image: c.image,
    onClick: () => go({
      page: 'category',
      cat: c.slug
    })
  }))));
}
function CategoryScreen({
  cat,
  go
}) {
  const {
    CategoryIcon,
    GroupDivider
  } = DS;
  const c = D.categories.find(x => x.slug === cat) || D.categories[1];
  const posts = D.posts.filter(p => p.primarySlug === c.slug);
  const groups = {};
  posts.forEach(p => {
    const k = p.secondary || 'Miscellaneous';
    (groups[k] = groups[k] || []).push(p);
  });
  const coll = new Intl.Collator('en', {
    numeric: true
  });
  const keys = Object.keys(groups).sort((a, b) => a === 'Miscellaneous' ? 1 : b === 'Miscellaneous' ? -1 : coll.compare(a, b));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go({
        page: 'categories'
      });
    },
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 14,
      letterSpacing: '.04em',
      textDecoration: 'none',
      color: 'var(--muted)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-left-s-line"
  }), "Categories"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      margin: '12px 0 14px'
    }
  }, /*#__PURE__*/React.createElement(CategoryIcon, {
    src: c.icon,
    size: 58
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "gb-page-title",
    style: {
      fontSize: 31,
      letterSpacing: '.02em',
      lineHeight: 1
    }
  }, c.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      lineHeight: 1.2,
      color: 'var(--muted)',
      margin: 0,
      paddingLeft: 2
    }
  }, posts.length, " \u7BC7\u6587\u7AE0"))), keys.length > 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 16px',
      fontFamily: 'var(--font-ui)',
      fontSize: 14
    }
  }, keys.map(k => /*#__PURE__*/React.createElement("a", {
    key: k,
    href: '#g-' + k
  }, k))) : null, posts.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      marginTop: 40
    }
  }, "\u9019\u500B\u5206\u985E\u9084\u6C92\u6709\u6587\u7AE0\u3002") : null, keys.map(k => /*#__PURE__*/React.createElement("section", {
    key: k
  }, /*#__PURE__*/React.createElement(GroupDivider, {
    label: k,
    id: 'g-' + k
  }), /*#__PURE__*/React.createElement(PostCards, {
    posts: groups[k],
    go: go
  }))));
}
function ArchivesScreen({
  go
}) {
  const {
    PageTitle,
    ArchiveList
  } = DS;
  const byYear = {};
  D.posts.forEach(p => {
    const y = p.date.slice(0, 4);
    (byYear[y] = byYear[y] || []).push({
      date: p.date.slice(0, 10),
      title: p.title,
      slug: p.slug
    });
  });
  const groups = Object.keys(byYear).sort().reverse().map(y => ({
    year: y,
    posts: byYear[y]
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageTitle, null, "Archives"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--muted)',
      margin: '8px 0 0'
    }
  }, "\u5171 ", D.posts.length, " \u7BC7\u6587\u7AE0"), /*#__PURE__*/React.createElement(ArchiveList, {
    groups: groups,
    onSelect: p => go({
      page: 'post',
      slug: p.slug
    })
  }));
}
function AboutScreen() {
  const {
    PageTitle,
    ItemCards,
    ItemCard,
    People,
    Person
  } = DS;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageTitle, {
    style: {
      marginBottom: 24
    }
  }, "About Me"), /*#__PURE__*/React.createElement("div", {
    className: "gb-prose"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)'
    }
  }, "\uFF08About Me \u5167\u6587\u5C1A\u672A\u63D0\u4F9B \u2014 \u4EE5\u4E0B\u70BA ItemCard / Person \u5143\u4EF6\u7684\u7248\u9762\u793A\u610F\u3002\uFF09"), /*#__PURE__*/React.createElement("h2", null, "Items"), /*#__PURE__*/React.createElement(ItemCards, null, /*#__PURE__*/React.createElement(ItemCard, {
    title: "Item title",
    subtitle: "subtitle"
  }), /*#__PURE__*/React.createElement(ItemCard, {
    title: "Item title",
    subtitle: "subtitle"
  }), /*#__PURE__*/React.createElement(ItemCard, {
    title: "Item title",
    subtitle: "subtitle"
  })), /*#__PURE__*/React.createElement("h2", null, "People"), /*#__PURE__*/React.createElement(People, null, /*#__PURE__*/React.createElement(Person, {
    title: "WiwiHo",
    subtitle: "wiwiho.me",
    url: "https://wiwiho.me"
  }), /*#__PURE__*/React.createElement(Person, {
    title: "Name",
    subtitle: "subtitle"
  }))));
}
Object.assign(window, {
  Shell,
  ArticlesScreen,
  PostScreen,
  CategoriesScreen,
  CategoryScreen,
  ArchivesScreen,
  AboutScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/data.js
try { (() => {
// Gino's Blog UI kit — sample data (from blogpost-example/ and DESIGN-SPEC.md §0)
window.GB_DATA = {
  icon: '../../assets/placeholders/notes.png',
  titleImage: '../../assets/brand/site-title-chalk.webp',
  categories: [['Operating System', 'operating-system'], ['Computer Organization', 'computer-organization'], ['DS, Algorithms', 'dsa-cp'], ['Linear Algebra', 'linear-algebra'], ['Discrete Mathematics', 'discrete-mathematics'], ['Parallel Programming', 'parallel-programming'], ['Compiler (Frontend)', 'compiler-frontend'], ['Formal Language', 'formal-language'], ['Language Learning', 'language-learning'], ['Other Course Notes', 'other-course-notes'], ['Life Logs', 'life-logs'], ['Rhythm Game', 'rhythm-game'], ['Miscellaneous', 'miscellaneous']].map(([name, slug], i) => ({
    name,
    slug,
    icon: `../../assets/category-icons/${slug}.svg`,
    image: `../../assets/placeholders/category-bg/${i + 1}.webp`
  })),
  // level-2 order per level-1 category (folders with no posts still show, empty)
  series: {
    'computer-organization': ['ISA', 'ALU', 'Cache', 'Pipeline CPU'],
    'discrete-mathematics': ['Graph Theory']
  },
  posts: [{
    slug: 'cache-fundamentals',
    title: '01 Cache Fundamentals',
    date: '2026-07-01 01:53:46',
    primary: 'Computer Organization',
    primarySlug: 'computer-organization',
    secondary: 'Cache',
    description: '簡單介紹 cache 是什麼、cache line 的結構、cache hierarchy，以及 cache 能善用程式的哪些特性（temporal locality 和 spatial locality）。',
    words: 520,
    readTime: 6,
    toc: [{
      id: 'h-cache-work',
      text: 'Cache 的大致工作原理',
      level: 2
    }, {
      id: 'h-hierarchy',
      text: 'Cache Hierarchy',
      level: 2
    }, {
      id: 'h-locality',
      text: 'Principle of Locality',
      level: 2
    }, {
      id: 'h-questions',
      text: 'Questions',
      level: 2
    }, {
      id: 'h-tf',
      text: 'True or False',
      level: 3
    }]
  }, {
    slug: 'perfect-matching',
    title: '3-6 1-factor (aka. Perfect Matching)',
    date: '2026-07-01 01:53:46',
    primary: 'Discrete Mathematics',
    primarySlug: 'discrete-mathematics',
    secondary: 'Graph Theory',
    description: '二分圖如果要檢查是否存在 Perfect Matching 可使用 Hall\u2019s Theorem，而在一般圖上則可以使用 Tutte\u2019s 1-factor Theorem。',
    words: 520,
    readTime: 6,
    toc: [{
      id: 'h-tutte',
      text: "Tutte's 1-factor Theorem",
      level: 2
    }, {
      id: 'h-tutte-proof',
      text: 'Proof',
      level: 3
    }, {
      id: 'h-obs',
      text: 'Observations',
      level: 4
    }, {
      id: 'h-build-s',
      text: '構造 S',
      level: 4
    }, {
      id: 'h-berge',
      text: 'Berge-Tutte Formula',
      level: 2
    }, {
      id: 'h-berge-proof',
      text: 'Proof',
      level: 3
    }]
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/data.js", error: String((e && e.message) || e) }); }

__ds_ns.ItemCard = __ds_scope.ItemCard;

__ds_ns.ItemCards = __ds_scope.ItemCards;

__ds_ns.People = __ds_scope.People;

__ds_ns.Person = __ds_scope.Person;

__ds_ns.Aside = __ds_scope.Aside;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.Figure = __ds_scope.Figure;

__ds_ns.MarkerList = __ds_scope.MarkerList;

__ds_ns.Reference = __ds_scope.Reference;

__ds_ns.Ruby = __ds_scope.Ruby;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tex = __ds_scope.Tex;

__ds_ns.Carousel = __ds_scope.Carousel;

__ds_ns.LinkCard = __ds_scope.LinkCard;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Staff = __ds_scope.Staff;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ArchiveList = __ds_scope.ArchiveList;

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.CategoryIcon = __ds_scope.CategoryIcon;

__ds_ns.CategoryPath = __ds_scope.CategoryPath;

__ds_ns.CategoryTile = __ds_scope.CategoryTile;

__ds_ns.GroupDivider = __ds_scope.GroupDivider;

__ds_ns.PageTitle = __ds_scope.PageTitle;

__ds_ns.MobileTopBar = __ds_scope.MobileTopBar;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.SeriesTree = __ds_scope.SeriesTree;

__ds_ns.NAV_ITEMS = __ds_scope.NAV_ITEMS;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.TableOfContents = __ds_scope.TableOfContents;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

})();

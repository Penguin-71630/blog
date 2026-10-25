// Gino's Blog UI kit — layout shell + screens
const DS = window.GinoSBlogDesignSystem_e90488;
const D = window.GB_DATA;

function useWidth() {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => { const f = () => setW(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  return w;
}

function seriesFor(cat) {
  const c = D.categories.find((x) => x.slug === cat); if (!c) return null;
  const posts = D.posts.filter((p) => p.primarySlug === cat);
  const coll = new Intl.Collator('en', { numeric: true });
  const names = [...(D.series[cat] || [])];
  posts.forEach((p) => { const k = p.secondary || 'Miscellaneous'; if (!names.includes(k)) names.push(k); });
  return { title: c.name, groups: names.map((n) => ({ name: n, posts: posts.filter((p) => (p.secondary || 'Miscellaneous') === n).sort((a, b) => coll.compare(a.title, b.title)).map((p) => ({ slug: p.slug, title: p.title })) })) };
}

function Shell({ nav, onNavigate, wide, seriesCat, activeSlug, onCategory, onPost, children }) {
  const w = useWidth();
  const mobile = w < 768;
  const { Sidebar, MobileTopBar, SeriesTree } = DS;
  const series = seriesCat ? seriesFor(seriesCat) : null;
  const tree = series ? <SeriesTree key={seriesCat} title={series.title} groups={series.groups} active={!activeSlug} activeSlug={activeSlug} onTitleClick={() => onCategory(seriesCat)} onSelect={(p) => onPost(p.slug)} /> : null;
  const footer = (
    <footer className="gb-footer"><span>© 2026 Gino's Blog</span><span>Built with Astro · Notes from Obsidian</span></footer>
  );
  if (mobile) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MobileTopBar active={nav} onNavigate={onNavigate} titleImage={D.titleImage}>{tree}</MobileTopBar>
        <main style={{ flex: 1, padding: '24px 16px 0' }}>{children}</main>
        <div style={{ padding: '0 16px' }}>{footer}</div>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 'var(--container-post)', margin: '0 auto', padding: '32px 32px 0', minHeight: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', gap: 'var(--column-gap)' }}>
        <Sidebar active={nav} onNavigate={onNavigate} titleImage={D.titleImage}>
          {tree}
        </Sidebar>
        <main style={{ flex: 1, minWidth: 0, paddingTop: 16, maxWidth: wide ? 'none' : 'var(--prose-max)' }}>{children}</main>
      </div>
      {footer}
    </div>
  );
}

function PostCards({ posts, go }) {
  const { ArticleCard } = DS;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--card-list-gap)' }}>
      {posts.map((p) => (
        <ArticleCard key={p.slug} date={p.date} primary={p.primary} secondary={p.secondary} title={p.title}
          description={p.description} words={p.words} readTime={p.readTime} icon={(D.categories.find((c) => c.slug === p.primarySlug) || {}).icon} onClick={() => go({ page: 'post', slug: p.slug })} />
      ))}
    </div>
  );
}

function ArticlesScreen({ go }) {
  const { PageTitle } = DS;
  return (
    <>
      <PageTitle style={{ marginBottom: 32 }}>Articles</PageTitle>
      <PostCards posts={D.posts} go={go} />
    </>
  );
}

function PostScreen({ slug, go }) {
  const { TableOfContents, CategoryPath } = DS;
  const w = useWidth();
  const post = D.posts.find((p) => p.slug === slug) || D.posts[0];
  const [active, setActive] = React.useState(post.toc[0] && post.toc[0].id);
  const Body = slug === 'perfect-matching' ? window.PostMatching : window.PostCache;
  const sideToc = w >= 1180;
  const jump = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' }); setActive(id); };
  React.useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  React.useEffect(() => {
    const f = () => { let cur = post.toc[0] && post.toc[0].id; for (const it of post.toc) { const el = document.getElementById(it.id); if (el && el.getBoundingClientRect().top < 120) cur = it.id; } setActive(cur); };
    window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f);
  }, [slug]);
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <article style={{ flex: 1, minWidth: 0, maxWidth: 'var(--prose-max)' }}>
        <header style={{ marginBottom: 56, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: w < 768 ? 28 : 'var(--size-post-title)', lineHeight: 1.25, margin: '0 0 12px', textWrap: 'balance' }}>{post.title}</h1>
          <div className="gb-card-meta" style={{ justifyContent: 'center' }}>
            <time className="gb-date">{post.date}</time>
            <span style={{ cursor: 'pointer' }} onClick={() => go({ page: 'category', cat: post.primarySlug })}><CategoryPath primary={post.primary} secondary={post.secondary} /></span>
          </div>
        </header>
        {!sideToc ? <TableOfContents variant="mobile" items={post.toc} activeId={active} onSelect={jump} /> : null}
        <div className="gb-prose"><Body /></div>
      </article>
      {sideToc ? <TableOfContents items={post.toc} activeId={active} onSelect={jump} /> : null}
    </div>
  );
}

function CategoriesScreen({ go }) {
  const { PageTitle, CategoryTile } = DS;
  const count = (slug) => D.posts.filter((p) => p.primarySlug === slug).length;
  return (
    <>
      <PageTitle style={{ marginBottom: 32 }}>Categories</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
        {D.categories.map((c) => <CategoryTile key={c.slug} name={c.name} count={count(c.slug)} icon={c.icon} image={c.image} onClick={() => go({ page: 'category', cat: c.slug })} />)}
      </div>
    </>
  );
}

function CategoryScreen({ cat, go }) {
  const { CategoryIcon, GroupDivider } = DS;
  const c = D.categories.find((x) => x.slug === cat) || D.categories[1];
  const posts = D.posts.filter((p) => p.primarySlug === c.slug);
  const groups = {};
  posts.forEach((p) => { const k = p.secondary || 'Miscellaneous'; (groups[k] = groups[k] || []).push(p); });
  const coll = new Intl.Collator('en', { numeric: true });
  const keys = Object.keys(groups).sort((a, b) => a === 'Miscellaneous' ? 1 : b === 'Miscellaneous' ? -1 : coll.compare(a, b));
  return (
    <>
      <a href="#" onClick={(e) => { e.preventDefault(); go({ page: 'categories' }); }} style={{ fontFamily: 'var(--font-ui)', fontSize: 14, letterSpacing: '.04em', textDecoration: 'none', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <i className="ri-arrow-left-s-line"></i>Categories
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0 14px' }}>
        <CategoryIcon src={c.icon} size={58} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 className="gb-page-title" style={{ fontSize: 31, letterSpacing: '.02em', lineHeight: 1 }}>{c.name}</h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.2, color: 'var(--muted)', margin: 0, paddingLeft: 2 }}>{posts.length} 篇文章</p>
        </div>
      </div>
      {keys.length > 1 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', fontFamily: 'var(--font-ui)', fontSize: 14 }}>
          {keys.map((k) => <a key={k} href={'#g-' + k}>{k}</a>)}
        </div>
      ) : null}
      {posts.length === 0 ? <p style={{ color: 'var(--muted)', marginTop: 40 }}>這個分類還沒有文章。</p> : null}
      {keys.map((k) => (
        <section key={k}>
          <GroupDivider label={k} id={'g-' + k} />
          <PostCards posts={groups[k]} go={go} />
        </section>
      ))}
    </>
  );
}

function ArchivesScreen({ go }) {
  const { PageTitle, ArchiveList } = DS;
  const byYear = {};
  D.posts.forEach((p) => { const y = p.date.slice(0, 4); (byYear[y] = byYear[y] || []).push({ date: p.date.slice(0, 10), title: p.title, slug: p.slug }); });
  const groups = Object.keys(byYear).sort().reverse().map((y) => ({ year: y, posts: byYear[y] }));
  return (
    <>
      <PageTitle>Archives</PageTitle>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--muted)', margin: '8px 0 0' }}>共 {D.posts.length} 篇文章</p>
      <ArchiveList groups={groups} onSelect={(p) => go({ page: 'post', slug: p.slug })} />
    </>
  );
}

function AboutScreen() {
  const { PageTitle, ItemCards, ItemCard, People, Person } = DS;
  return (
    <>
      <PageTitle style={{ marginBottom: 24 }}>About Me</PageTitle>
      <div className="gb-prose">
        <p style={{ color: 'var(--muted)' }}>（About Me 內文尚未提供 — 以下為 ItemCard / Person 元件的版面示意。）</p>
        <h2>Items</h2>
        <ItemCards><ItemCard title="Item title" subtitle="subtitle" /><ItemCard title="Item title" subtitle="subtitle" /><ItemCard title="Item title" subtitle="subtitle" /></ItemCards>
        <h2>People</h2>
        <People><Person title="WiwiHo" subtitle="wiwiho.me" url="https://wiwiho.me" /><Person title="Name" subtitle="subtitle" /></People>
      </div>
    </>
  );
}

Object.assign(window, { Shell, ArticlesScreen, PostScreen, CategoriesScreen, CategoryScreen, ArchivesScreen, AboutScreen });

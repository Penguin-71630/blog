// Gino's Blog UI kit — sample data (from blogpost-example/ and DESIGN-SPEC.md §0)
window.GB_DATA = {
  icon: '../../assets/placeholders/notes.png',
  titleImage: '../../assets/brand/site-title-chalk.webp',
  categories: [
    ['Operating System', 'operating-system'], ['Computer Organization', 'computer-organization'], ['DS, Algorithms', 'ds-algo'],
    ['Linear Algebra', 'linear-algebra'], ['Discrete Mathematics', 'discrete-mathematics'], ['Parallel Programming', 'parallel-programming'],
    ['Compiler (Frontend)', 'compiler-frontend'], ['Formal Language', 'formal-language'], ['Language Learning', 'language-learning'],
    ['Other Course Notes', 'other-course-notes'], ['Life Logs', 'life-logs'], ['Rhythm Game', 'rhythm-game'], ['Miscellaneous', 'miscellaneous'],
  ].map(([name, slug], i) => ({ name, slug, icon: `../../assets/category-icons/${slug}.svg`, image: `../../assets/placeholders/category-bg/${i + 1}.webp` })),
  // level-2 order per level-1 category (folders with no posts still show, empty)
  series: {
    'computer-organization': ['ISA', 'ALU', 'Cache', 'Pipeline CPU'],
    'discrete-mathematics': ['Graph Theory'],
  },
  posts: [
    {
      slug: 'cache-fundamentals', title: '01 Cache Fundamentals', date: '2026-07-01 01:53:46',
      primary: 'Computer Organization', primarySlug: 'computer-organization', secondary: 'Cache',
      description: '簡單介紹 cache 是什麼、cache line 的結構、cache hierarchy，以及 cache 能善用程式的哪些特性（temporal locality 和 spatial locality）。',
      words: 520, readTime: 6,
      toc: [
        { id: 'h-cache-work', text: 'Cache 的大致工作原理', level: 2 },
        { id: 'h-hierarchy', text: 'Cache Hierarchy', level: 2 },
        { id: 'h-locality', text: 'Principle of Locality', level: 2 },
        { id: 'h-questions', text: 'Questions', level: 2 },
        { id: 'h-tf', text: 'True or False', level: 3 },
      ],
    },
    {
      slug: 'perfect-matching', title: '3-6 1-factor (aka. Perfect Matching)', date: '2026-07-01 01:53:46',
      primary: 'Discrete Mathematics', primarySlug: 'discrete-mathematics', secondary: 'Graph Theory',
      description: '二分圖如果要檢查是否存在 Perfect Matching 可使用 Hall\u2019s Theorem，而在一般圖上則可以使用 Tutte\u2019s 1-factor Theorem。',
      words: 520, readTime: 6,
      toc: [
        { id: 'h-tutte', text: "Tutte's 1-factor Theorem", level: 2 },
        { id: 'h-tutte-proof', text: 'Proof', level: 3 },
        { id: 'h-obs', text: 'Observations', level: 4 },
        { id: 'h-build-s', text: '構造 S', level: 4 },
        { id: 'h-berge', text: 'Berge-Tutte Formula', level: 2 },
        { id: 'h-berge-proof', text: 'Proof', level: 3 },
      ],
    },
  ],
};

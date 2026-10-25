// Post body: Discrete Mathematics / Graph Theory / 3-6 1-factor (aka. Perfect Matching).md
function PostMatching() {
  const { Callout, Figure, Tex } = window.GinoSBlogDesignSystem_e90488;
  const t = (s, ...v) => <Tex tex={String.raw(s, ...v)} />;
  const td = (s, ...v) => <Tex display tex={String.raw(s, ...v)} />;
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
  return (
    <>
      <Callout type="note" title="Factor"><p>Factor 就是 spanning subgraph。</p></Callout>
      <Callout type="note" title={<>{t`k`}-factor</>}><p>{t`k`}-factor：{t`k`}-regular 的 factor</p><p>例如 2-factor 就是一堆環。</p></Callout>
      <Callout type="note" title="1-factor">
        <p>1-factor 就是完美匹配（perfect matching）。<br />因此一張圖 {t`G`} 如果有奇數個點則不存在 1-factor。</p>
        <p>註：正式地說，perfect matching 是一組邊集，1-factor 是子圖，不太一樣，但為了方便思考所以暫時當做 1-factor {t`\equiv`} perfect matching。</p>
      </Callout>
      <Callout type="question"><p>完全圖 {t`K_{2n}`} 有幾組完美匹配？</p></Callout>
      <p>令 {t`P = (a_1, a_2, \cdots, a_{2n})`} 是 {t`1 \sim 2n`} 的 permutation。</p>
      <p>將 {t`P`} 兩兩元素一組：{t`(a_1, a_2), (a_3, a_4), \cdots`} 這種分組方式一定是合法的匹配（且完美）。</p>
      <p>{t`P`} 有 {t`(2n)!`} 種排列方式。<br />因為組內元素順序不重要，所以除以 {t`(2!)^n`}<br />因為組與組之間的順序不重要，所以除以 {t`n!`}</p>
      <p>答案：{t`\dfrac{(2n)!}{2^n \cdot n!}`}</p>

      <h2 id="h-tutte">Tutte's 1-factor Theorem</h2>
      <Callout type="note" title={t`o(G)`}>
        <p>定義 {t`o(G) :=`} {t`G`} 的 odd components 個數。</p>
        <Figure src="../../assets/posts/o-g-example.png" alt="o(G) example" />
      </Callout>
      <Callout type="success" title="Tutte's 1-factor Theorem"><p>圖 {t`G`} 存在完美匹配（aka. 1-factor） {t`\iff`} {t`\forall S \subseteq V(G)`}, {t`o(G - S) \le |S|`}</p></Callout>
      <h3 id="h-tutte-proof">Proof</h3>
      <p>({t`\Rightarrow`}) 先把圖大概捏成這種形狀：</p>
      <Figure src="../../assets/posts/tutte-theorem-proof.png" alt="tutte theorem proof" center width={450} />
      <p>圖 {t`G`} 切掉 {t`S`} 之後，有 {t`o(G - S)`} 個 odd components。<br />這 {t`o(G - S)`} 個 odd components 無論如何都一定會有至少 {t`1`} 個人落單，因為這些 odd components 只跟 {t`S`} 連接，這些人得靠 {t`S`} 來拯救（否則就沒辦法有完美匹配了）。</p>
      <p>故 {t`S`} 至少要有 {t`o(G - S)`} 個成員，且任意取出來的 {t`S`} 都要遵守（這是下界）。</p>
      <p>({t`\Leftarrow`}) West 原文書的證明我看不太懂，所以從縮花演算法的角度來理解，而且還能順帶看出為什麼這個定理的 corollary 可以推出 Hall's Theorem。</p>
      <p>Prerequisite：<a href="https://oi-wiki.org/graph/graph-matching/general-match/">Edmond's Blossom Algorithm</a>，用於求一般圖的最大匹配。</p>
      <p>利用這個演算法來證的話，我們改證 contrapositive：</p>
      <blockquote><p>若 {t`G`} 沒有完美匹配，則存在 {t`S`} 使 {t`o(G - S) > |S|`}。</p></blockquote>
      <p>取最大匹配 {t`M`}。因為沒有完美匹配，一定有點落單，令其中一個為 {t`r`}。<br />從 {t`r`} 出發做縮花演算法，會長出一棵交錯樹，下圖為做完 BFS/DFS 之後這棵交錯樹的長相示意圖：</p>
      <DotGraph dot={tree} maxWidth={260} />
      <p>粗邊為匹配邊；綠色為 o 點，橘色為 i 點，虛線框為 o 塊（就是花）。<br />這棵交錯樹會從 o 點往下走未匹配邊到 i 點，從 i 點往下走匹配邊到 o 點。</p>
      <p>因為 {t`M`} 已經是最大匹配，根據 Berge's Lemma，這次搜尋一定找不到增廣路，最後 queue 清空結束。</p>
      <h4 id="h-obs">Observations</h4>
      <ol>
        <li>i 點的小孩一定有且只有一個，也就是跟它匹配的 o 塊。</li>
        <li>o 塊 either 是孤點 or 花，兩者點數都是奇數
          <ul><li>如果出現巢狀的花：一樣點數是奇數，因為奇數個「點」組成的環、每個「點」又是奇數個點，加起來還是奇數。</li></ul></li>
        <li>根所在的 o 塊（可能就是 {t`r`}，也可能是包含 {t`r`} 的花）是<strong>唯一沒有跟 i 點匹配的 o 塊</strong>。</li>
        <li><strong>不同的 o 塊之間沒有邊，o 塊也沒有邊連到 {t`T`} 以外的點</strong>：
          <ul><li>連到 {t`T`} 外的落單點 → 找到增廣路，矛盾</li><li>連到 {t`T`} 外的已匹配點 → 樹還能繼續長，搜尋還沒結束，矛盾</li><li>連到另一個 o 塊 → 會形成新的花並被縮掉，搜尋還沒結束，矛盾</li></ul></li>
      </ol>
      <h4 id="h-build-s">構造 {t`S`}</h4>
      <p>取 {t`S = \{T \text{ 上的 i 點}\}`}。</p>
      <ul>
        <li>由 1、3，i 點和根以外的 o 塊透過匹配一一對應，所以 o 塊個數 {t`= |S| + 1`}。</li>
        <li>由 4，切掉 {t`S`} 之後，每個 o 塊自己就是一個連通塊，並且由 2，它是 odd component。</li>
      </ul>
      <p>故 {t`o(G - S) \ge |S| + 1 > |S|`}，違反 Tutte condition。{t`\blacksquare`}</p>
      <Callout type="example" title="Remark"><p>如果 o 塊全都是孤點，這就是 Hall's Theorem 的證明。</p><ul><li>i 點 = Hall 的 {t`N(S)`}，o 點 = Hall 的 {t`S`}。</li></ul></Callout>
      <Callout type="example"><Figure src="../../assets/posts/tutte-theorem-example.png" alt="tutte theorem example" /></Callout>
      <Callout type="question"><p>證明沒有割邊的 {t`3`}-regular graph {t`\Rightarrow`} 有 {t`1`} 個 {t`1`}-factor。</p></Callout>
      <p>沒有割邊：</p>
      <Figure src="../../assets/posts/3-regular-no-cut-edge.png" alt="3-regular no cut edge" />
      <p>如果看 odd components {t`\rightarrow`} {t`S`} 的邊數，會發現至少是 {t`3 \cdot o(G - S)`}<br />而 {t`S`} 能給出最多 {t`3|S|`} 條向外連出去的邊，因此：</p>
      {td`\begin{align*} 3 \cdot o(G - S) \le 3 |S|\\ o(G - S) \le |S| \end{align*}`}
      <p>滿足 Tutte's condition，故 {t`G`} 存在完美匹配。</p>

      <h2 id="h-berge">Berge-Tutte Formula</h2>
      <Callout type="success" title="Berge-Tutte Formula">
        <p>假設 {t`n`} 個點的圖 {t`G`} 的最大匹配蓋出來後落單點的個數是 {t`d`}，則：</p>
        {td`\displaystyle d = \max_{S \subseteq V(G)} ( o(G - S) - |S| )`}
        <p>因此圖 {t`G`} 的最大匹配大小是：</p>
        {td`\dfrac{n - d}{2} = \dfrac12 \cdot \min_{S \subseteq V(G)} \{n - o(G - S) + |S|\}`}
      </Callout>
      <h3 id="h-berge-proof">Proof</h3>
      <p>設 {t`\displaystyle d = \max_{S \subseteq V(G)} (o(G - S) - |S|)`}，欲證明最大匹配下落單點個數就是 {t`d`}。</p>
      {td`d \ge o(G - S) - |S| \ge \bigl(|S| + (n - 2|M|)\bigr) - |S| = n - 2|M| = \text{落單點個數}`}
    </>
  );
}
window.PostMatching = PostMatching;

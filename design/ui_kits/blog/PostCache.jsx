// Post body: Computer Organization / Cache / 01 Cache Fundamentals.md
function PostCache() {
  const { Callout, MarkerList, CodeBlock, Figure } = window.GinoSBlogDesignSystem_e90488;
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
  return (
    <>
      <p>Cache（快取）：一種高速的暫存資料儲存層，把 CPU 常用的、最近讀過的、算過的資料留一份在更方便取得的地方，當 CPU 下次需要時便能快速拿來使用。</p>
      <p>Cache 是位在 Register 下一階的記憶單元。</p>
      <h2 id="h-cache-work">Cache 的大致工作原理</h2>
      <p>一條 Cache Line 的結構大致如下：</p>
      <CodeBlock code={ascii} />
      <p>Data Payload 一共有 64 Bytes（Memory Block 也是這個大小，方便對應），Control Metadata 則是存 Cache 系統運作時需要的資訊：</p>
      <MarkerList items={[
        { marker: 'i', content: 'Tag Field：存放高位的記憶體位址，用來確認目前存的是哪個 Memory Block 的資料' },
        { marker: 'k', content: 'Valid bit：標記此資料是否有效（無過期）' },
        { marker: 'k', content: 'Dirty bit：標記此資料是否被修改過、尚未寫回 DRAM' },
        { marker: 'k', content: 'Replacement bit：用於 replacement policy' },
      ]} />
      <h2 id="h-hierarchy">Cache Hierarchy</h2>
      <p>L1, L2 Cache 是長在每個 CPU Core 裡面，其中 L1 Cache 又分成 Instruction Cache (I-Cache)、Data Cache (D-Cache)。</p>
      <Callout type="notes" title="其他 units 介紹">
        <ul>
          <li>ALU: Arithmetic Logic Unit</li>
          <li>FPU: Floating-Point Unit</li>
          <li>LSU: Load/Store Unit</li>
          <li>TLB: Translation Lookaside Buffer，用來加速 virtual memory address 與 physical memory address 轉換</li>
        </ul>
      </Callout>
      <Figure src="../../assets/posts/memory-units-in-a-cpu-core.png" alt="Memory Units in a CPU Core" center width={400} />
      <p>L3 Cache 是同一個 CPU 內所有 core 一起共用。</p>
      <Figure src="../../assets/posts/memory-units.png" alt="Memory Units" />
      <p>近代有些系統（例如 IBM 大型主機 zSystems、超級電腦 Intel Xeon Phi/Max、SoC 晶片如 Apple Silicon）會有類似「L4 Cache」之類的東西，供 CPU、GPU、NPU 等單元共享，或是跨節點共享。</p>
      <h2 id="h-locality">Principle of Locality</h2>
      <p>滿多程式都會有 locality 的特性，而 cache 的出現能善加利用這種特性，大幅提升程式執行效率。</p>
      <MarkerList items={[
        { marker: 'p', content: 'Temporal Locality：如果一個位址被 access，那麼短時間內會再被 access 數次。' },
        { marker: 'i', content: '例：loop' },
      ]} />
      <CodeBlock lang="cpp" code={'for (int i = 0; i < n; i++) {\n\tfor (int j = 0; j < 10; j++) {\n\t\tsum += arr[j];\n\t}\n}'} />
      <MarkerList items={[
        { marker: 'p', content: 'Spatial Locality：指存取位址的 pattern 具有規律。如果一個位址被 access，那麼它附近的、與之相關的位址有可能接下來會被 access 到。' },
        { marker: 'i', content: '例：sequential scan' },
      ]} />
      <CodeBlock lang="cpp" code={"for (int i = 0; i < 1'000'000; i++) {\n\tsum += arr[i];\n}"} />
      <h2 id="h-questions">Questions</h2>
      <h3 id="h-tf">True or False</h3>
      <MarkerList items={[
        { marker: 'p', content: 'Caches take advantage of temporal locality.' },
        { marker: 'c', content: 'On a read, the value returned depends on which blocks are in the cache.' },
        { marker: 'p', content: 'Most of the cost of the memory hierarchy is at the highest level.' },
        { marker: 'p', content: 'Most of the capacity of the memory hierarchy is at the lowest level.' },
      ]} />
    </>
  );
}
window.PostCache = PostCache;

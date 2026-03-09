import { encodeSlug } from '@lib/route';
import { cn, shuffleArray } from '@lib/utils';
import { useMemo } from 'react';
import type { PostRefWithCategory } from '@/types/blog';

interface Props {
  allPosts: PostRefWithCategory[];
  relatedPosts: PostRefWithCategory[];
  leftCount: number;
  rightCount: number;
}

/**
 * Wrapper component to coordinate random post selection for small post counts
 * Ensures no duplicate posts between left (random) and right (related/fallback) sides
 */
export default function PostFooterLists({ allPosts, relatedPosts, leftCount, rightCount }: Props) {
  const { leftPosts, rightPosts, hasRelatedPosts } = useMemo(() => {
    const hasRelated = relatedPosts.length > 0;

    // Debug logging
    if (import.meta.env.DEV) {
      console.log('[PostFooterLists] relatedPosts:', relatedPosts);
      console.log('[PostFooterLists] hasRelated:', hasRelated);
    }

    // Shuffle once and split to avoid duplicates
    const shuffled = shuffleArray(allPosts);
    if (hasRelated) {
      return {
        leftPosts: relatedPosts,
        rightPosts: shuffled.slice(0, rightCount),
        hasRelatedPosts: true,
      };
    } else {
      return {
        leftPosts: shuffled.slice(0, leftCount), // 左邊拿前段
        rightPosts: shuffled.slice(leftCount, leftCount + rightCount), // 右邊拿後段
        hasRelatedPosts: false,
      };
    }
  }, [allPosts, relatedPosts, leftCount, rightCount]);

  const leftTitle = hasRelatedPosts ? '相關文章' : '隨機文章';
  // 右邊：如果有相關文章（代表左邊已佔用），右邊顯示「隨機文章」；否則（代表左右都是隨機），右邊不顯示標題（接續左邊）
  const rightTitle = hasRelatedPosts ? '隨機文章' : '';

  return (
    <>
      {/* Left side */}
      {leftPosts.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-2xl text-foreground/80">{leftTitle}</h2>
          {/* 左邊現在一定有標題，所以移除了原本的 -mt-4 對齊 hack */}
          <div className="flex flex-col gap-2">
            {leftPosts.map((post, index) => (
              <a
                key={post.slug}
                href={`/post/${encodeSlug(post.link ?? post.slug)}`}
                className="group flex gap-3 rounded-md p-2 text-sm transition-colors duration-300 hover:bg-foreground/5 hover:text-primary"
              >
                {/* 左邊的編號邏輯：永遠從 1 開始 (不管是相關文章第1篇 還是 隨機文章第1篇) */}
                <span className="shrink-0 font-mono text-foreground/30">{index + 1}</span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  {post.categoryName && <div className="truncate text-foreground/50 text-xs">{post.categoryName}</div>}
                  <div className="line-clamp-2 text-foreground/80 transition-colors group-hover:text-primary">{post.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Right side */}
      <div className="flex flex-col gap-4">
        {rightTitle && <h2 className="font-semibold text-2xl text-foreground/80">{rightTitle}</h2>}
        {/* 將對齊用的 CSS hack 移到這裡：當沒有 rightTitle 時使用 */}
        <div className={cn('flex flex-col gap-2', { '-mt-4 pt-12 md:-mt-5 md:pt-0': !rightTitle })}>
          {rightPosts.map((post, index) => (
            <a
              key={post.slug}
              href={`/post/${encodeSlug(post.link ?? post.slug)}`}
              className="group flex gap-3 rounded-md p-2 text-sm transition-colors duration-300 hover:bg-foreground/5 hover:text-primary"
            >
              {/* 右邊的編號邏輯：
                  如果有相關文章 -> 這裡是隨機文章的第一批 -> index + 1
                  如果沒相關文章 -> 這裡是隨機文章的第二批 (接續左邊) -> index + leftCount + 1
              */}
              <span className="shrink-0 font-mono text-foreground/30">{index + (hasRelatedPosts ? 1 : leftCount + 1)}</span>
              <div className="flex min-w-0 flex-col gap-0.5">
                {post.categoryName && <div className="truncate text-foreground/50 text-xs">{post.categoryName}</div>}
                <div className="line-clamp-2 text-foreground/80 transition-colors group-hover:text-primary">{post.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

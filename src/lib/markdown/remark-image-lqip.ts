/**
 * Remark plugin to attach LQIP styles to markdown images before Astro rewrites
 * image src values to optimized /_astro/* URLs.
 */
import path from 'node:path';
import type { Image, Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { getLqipStyle } from '../lqip.ts';

function resolveImagePath(src: string, file: any): string {
  if (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const filePath = file.history?.[0] || file.path;
  if (!filePath) {
    return src;
  }

  const absolutePath = path.resolve(path.dirname(filePath), src);
  const relativePath = path.relative(process.cwd(), absolutePath);
  return `/${relativePath.split(path.sep).join('/')}`;
}

export function remarkImageLqip() {
  return (tree: Root, file: any) => {
    visit(tree, 'image', (node: Image) => {
      const style = getLqipStyle(resolveImagePath(node.url, file));
      if (!style) return;

      node.data = {
        ...node.data,
        hProperties: {
          ...((node.data?.hProperties as Record<string, unknown>) ?? {}),
          'data-lqip-style': style,
          style,
        },
      };
    });
  };
}

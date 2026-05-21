/**
 * Remark plugin to convert relative image paths in .md files to work with Astro's image optimization.
 *
 * For .md files, Astro doesn't automatically resolve relative image paths like it does for .mdx.
 * This plugin converts relative paths (./folder/image.png) to absolute paths that reference
 * the co-located image folder next to the markdown file.
 *
 * Example:
 * - File: src/content/blog/cp/2020-Sprout-I.md
 * - Image: ![](./2020-Sprout-I/1.jpg)
 * - Converts to: ![](/src/content/blog/cp/2020-Sprout-I/1.jpg)
 */

import path from 'node:path';
import type { Image, Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { getLqipStyle } from '../lqip.ts';

export function remarkMdImagePath() {
  return (tree: Root, file: any) => {
    // Only process .md files, not .mdx
    const filePath = file.history?.[0] || file.path;
    if (!filePath || !filePath.endsWith('.md')) {
      return;
    }

    visit(tree, 'image', (node: Image) => {
      // Only process relative paths starting with ./
      if (!node.url.startsWith('./')) {
        return;
      }

      // Get the directory of the current markdown file
      const fileDir = path.dirname(filePath);

      const [imageUrl, hash] = node.url.split('#');

      // Resolve the absolute path
      const absolutePath = path.join(fileDir, imageUrl);

      // Convert to a path relative to the project root
      // This assumes the project root is the parent of src/
      const projectRoot = process.cwd();
      const relativePath = path.relative(projectRoot, absolutePath);

      // Convert to URL format (forward slashes, starting with /)
      const resolvedUrl = '/' + relativePath.split(path.sep).join('/');
      const lqipStyle = getLqipStyle(resolvedUrl);

      node.url = hash ? `${resolvedUrl}#${hash}` : resolvedUrl;
      if (lqipStyle) {
        node.data = {
          ...node.data,
          hProperties: {
            ...((node.data?.hProperties as Record<string, unknown>) ?? {}),
            'data-lqip-style': lqipStyle,
            style: lqipStyle,
          },
        };
      }
    });
  };
}

/**
 * Remark plugin to handle image width syntax: ![alt](path.png#50)
 *
 * In MDX/content collections, Astro's image pipeline rejects paths containing
 * a hash fragment (#50), treating them as remote URLs without dimensions.
 * This plugin strips the hash from the URL so Astro can resolve the image,
 * then stores the width value in hProperties so remark-rehype passes it as
 * a data-width attribute on the generated <img> element.
 * rehype-image-placeholder.ts then preserves data-width via ...node.properties.
 */
import type { Image, Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function remarkImageWidth() {
  return (tree: Root) => {
    visit(tree, 'image', (node: Image) => {
      const hashMatch = node.url.match(/^(.*?)#(\d+)$/);
      if (!hashMatch) return;

      const [, cleanUrl, width] = hashMatch;

      node.url = cleanUrl;
      node.data = {
        ...node.data,
        hProperties: {
          ...((node.data?.hProperties as Record<string, unknown>) ?? {}),
          class: `img-w-${width}`,
        },
      };
    });
  };
}

/**
 * Rehype plugin to enhance images with lazy loading and placeholder containers
 * Wraps images in figure elements with placeholder styling for CLS prevention
 */
import path from 'node:path';
import type { Element, Root } from 'hast';
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

function getOptimizedImageLqipStyle(src: string, file: any): string | undefined {
  if (!src.startsWith('/_astro/')) {
    return undefined;
  }

  const filePath = file.history?.[0] || file.path;
  if (!filePath) {
    return undefined;
  }

  const optimizedName = path.basename(src);
  const originalBaseName = optimizedName.split('.')[0];
  if (!originalBaseName) {
    return undefined;
  }

  const fileDir = path.dirname(filePath);
  const postName = path.basename(filePath, path.extname(filePath));
  const candidateDirs = [path.join(fileDir, postName), fileDir];
  const candidateExts = ['webp', 'png', 'jpg', 'jpeg'];

  for (const dir of candidateDirs) {
    for (const ext of candidateExts) {
      const candidatePath = path.join(dir, `${originalBaseName}.${ext}`);
      const relativePath = path.relative(process.cwd(), candidatePath);
      const style = getLqipStyle(`/${relativePath.split(path.sep).join('/')}`);
      if (style) {
        return style;
      }
    }
  }

  return undefined;
}

function getImageLqipStyle(node: Element, file: any): string | undefined {
  const lqipStyleFromRemark =
    typeof node.properties?.['data-lqip-style'] === 'string'
      ? node.properties['data-lqip-style']
      : typeof node.properties?.dataLqipStyle === 'string'
        ? node.properties.dataLqipStyle
        : undefined;

  const src = typeof node.properties?.src === 'string' ? node.properties.src : undefined;
  return (
    lqipStyleFromRemark ??
    (src ? (getLqipStyle(resolveImagePath(src, file)) ?? getOptimizedImageLqipStyle(src, file)) : undefined)
  );
}

export function rehypeImagePlaceholder() {
  return (tree: Root, file: any) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'img') return;
      if (index === undefined || !parent) return;

      // Skip if already wrapped (e.g., in a figure or custom component)
      if (parent.type === 'element' && parent.tagName === 'figure') {
        const lqipStyle = getImageLqipStyle(node, file);
        if (lqipStyle && !parent.properties?.style) {
          parent.properties = {
            ...parent.properties,
            style: lqipStyle,
          };
        }
        if (node.properties) {
          delete node.properties['data-lqip-style'];
          delete node.properties.dataLqipStyle;
        }
        return;
      }

      // Skip wrapping if image is inside a link (e.g., [![alt](img)](url))
      // Only add lazy loading attributes, don't wrap with figure
      if (parent.type === 'element' && parent.tagName === 'a') {
        node.properties = {
          ...node.properties,
          loading: 'lazy',
          decoding: 'async',
        };
        return;
      }

      // Get existing class (handle both string and array formats per HAST spec)
      const existingClass = Array.isArray(node.properties?.class)
        ? node.properties.class.join(' ')
        : (node.properties?.class ?? '');

      // Add lazy loading attributes and class
      node.properties = {
        ...node.properties,
        loading: 'lazy',
        decoding: 'async',
        class: `${existingClass} markdown-image`.trim(),
      };

      const lqipStyle = getImageLqipStyle(node, file);
      if (node.properties) {
        delete node.properties['data-lqip-style'];
        delete node.properties.dataLqipStyle;
      }

      // Wrap in figure container
      const wrapper: Element = {
        type: 'element',
        tagName: 'figure',
        properties: {
          class: 'markdown-image-wrapper',
          ...(lqipStyle && { style: lqipStyle }),
        },
        children: [node],
      };

      // Replace img with wrapper
      parent.children[index] = wrapper;
    });
  };
}

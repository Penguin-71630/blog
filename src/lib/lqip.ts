/**
 * LQIP (Low Quality Image Placeholder) utilities
 *
 * Provides functions to get LQIP gradient backgrounds for images.
 */

import lqipData from '../assets/lqips.json';

const lqips = lqipData as Record<string, string>;

/**
 * Convert image path to LQIP key.
 * Supports public image URLs like /img/cover/1.webp and content image URLs
 * like /src/content/blog/post/image.png.
 */
function imagePathToKey(imagePath: string): string {
  const cleanPath = imagePath.split(/[?#]/)[0];

  if (cleanPath.startsWith('/img/')) {
    return cleanPath.replace(/^\/img\//, '');
  }

  if (cleanPath.startsWith('/src/content/blog/')) {
    return cleanPath.slice(1);
  }

  if (cleanPath.startsWith('src/content/blog/')) {
    return cleanPath;
  }

  return cleanPath.replace(/^\//, '');
}

/**
 * Get the LQIP gradient CSS for an image
 * @param imagePath Image path (e.g., /img/cover/1.webp)
 * @returns CSS gradient string or undefined if not found
 */
export function getLqipGradient(imagePath: string): string | undefined {
  const key = imagePathToKey(imagePath);
  const compact = lqips[key];
  if (compact?.length !== 18) return undefined;

  // Decode compact format: "aabbccddeeff" → 3 hex colors
  const c1 = `#${compact.slice(0, 6)}`;
  const c2 = `#${compact.slice(6, 12)}`;
  const c3 = `#${compact.slice(12, 18)}`;

  return `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
}

/**
 * Check if an image path is external (starts with http)
 */
export function isExternalImage(imagePath: string): boolean {
  return imagePath.startsWith('http://') || imagePath.startsWith('https://');
}

/**
 * Get LQIP style for an image
 * Returns background-image style with gradient
 */
export function getLqipStyle(imagePath: string): string | undefined {
  if (isExternalImage(imagePath)) {
    return undefined;
  }
  const gradient = getLqipGradient(imagePath);
  return gradient ? `background-image:${gradient}` : undefined;
}

/**
 * Get LQIP props for component usage
 */
export function getLqipProps(imagePath: string): { style?: string; class?: string } {
  if (isExternalImage(imagePath)) {
    return { class: 'lqip-fallback' };
  }

  const style = getLqipStyle(imagePath);
  return style ? { style } : {};
}

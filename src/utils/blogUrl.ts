/**
 * Blog URL configuration utility
 *
 * Returns the appropriate blog URL based on the environment:
 * - Production (default): /blog (proxied by nginx) for client URLs
 * - Production (default): https://redem.c3sl.ufpr.br/blog for API calls (server-side)
 * - Local development: https://redem.c3sl.ufpr.br/blog (set in .env.local)
 */

/**
 * Get the base blog URL for client-side links
 * Defaults to /blog for production (nginx proxy)
 * Can be relative URL since it's used in the browser
 */
export const getBlogUrl = (): string => {
  return process.env.NEXT_PUBLIC_BLOG_URL || '/blog';
};

/**
 * Get the blog API base URL for WordPress REST API
 * IMPORTANT: Always returns an absolute URL since API calls happen on server-side
 * In production, uses the public URL because Node.js cannot resolve relative URLs
 */
export const getBlogApiUrl = (): string => {
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL || 'https://redem.c3sl.ufpr.br/blog';

  // If NEXT_PUBLIC_BLOG_URL is set and is absolute, use it
  if (blogUrl && blogUrl.startsWith('http')) {
    return `${blogUrl}/wp-json/wp/v2`;
  }

  // Production default: use the public URL for server-side API calls
  // (relative URLs won't work in Node.js fetch calls)
  return 'https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2';
};

/**
 * Get a blog post URL by ID
 * Uses getBlogUrl() for client-side navigation
 */
export const getBlogPostUrl = (id: string | number): string => {
  return `${getBlogUrl()}/?p=${id}`;
};

/**
 * Get a specific blog page URL
 * Uses getBlogUrl() for client-side navigation
 */
export const getBlogPageUrl = (path: string): string => {
  const blogUrl = getBlogUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${blogUrl}${cleanPath}`;
};

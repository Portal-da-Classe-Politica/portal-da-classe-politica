/**
 * Blog URL configuration utility
 *
 * Returns the appropriate blog URL based on the environment:
 * - Production (default): /blog (proxied by nginx)
 * - Local development: https://redem.c3sl.ufpr.br/blog (set in .env.local)
 */

/**
 * Get the base blog URL
 * Defaults to /blog for production (nginx proxy)
 */
export const getBlogUrl = (): string => {
  return process.env.NEXT_PUBLIC_BLOG_URL || '/blog';
};

/**
 * Get the blog API base URL for WordPress REST API
 */
export const getBlogApiUrl = (): string => {
  return `${getBlogUrl()}/wp-json/wp/v2`;
};

/**
 * Get a blog post URL by ID
 */
export const getBlogPostUrl = (id: string | number): string => {
  return `${getBlogUrl()}/?p=${id}`;
};

/**
 * Get a specific blog page URL
 */
export const getBlogPageUrl = (path: string): string => {
  const blogUrl = getBlogUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${blogUrl}${cleanPath}`;
};

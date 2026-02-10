/**
 * Blog URL configuration utility
 *
 * Environment Variables:
 * - NEXT_PUBLIC_BLOG_URL: Client-side blog URL (browser links)
 *   • Default: /blog (nginx proxy in production)
 *   • Local dev: https://redem.c3sl.ufpr.br/blog
 *
 * - BLOG_API_URL: Server-side WordPress API URL (for fetch calls)
 *   • Default: http://127.0.0.1:8081 (direct localhost in production)
 *   • Local dev: https://redem.c3sl.ufpr.br/blog
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
 * Uses localhost in production for direct internal access, avoiding external network
 */
export const getBlogApiUrl = (): string => {
  // Check for dedicated server-side API URL (not prefixed with NEXT_PUBLIC_)
  const serverApiUrl = process.env.BLOG_API_URL;
  if (serverApiUrl) {
    return serverApiUrl.endsWith('/wp-json/wp/v2') ? serverApiUrl : `${serverApiUrl}/wp-json/wp/v2`;
  }

  // Check if NEXT_PUBLIC_BLOG_URL is set with absolute URL (local dev)
  const publicBlogUrl = process.env.NEXT_PUBLIC_BLOG_URL;
  if (publicBlogUrl && publicBlogUrl.startsWith('http')) {
    return `${publicBlogUrl}/wp-json/wp/v2`;
  }

  // Production default: use localhost directly for best performance
  // This avoids DNS resolution and external network calls
  return 'http://127.0.0.1:8081/wp-json/wp/v2';
};

/**
 * Rewrite an internal WordPress URL to a public-facing URL.
 *
 * WordPress stores URLs using its own siteurl (e.g. http://127.0.0.1:8081).
 * These are unreachable from the browser, so we replace the internal origin
 * with the public blog base (e.g. /blog) which is served via nginx proxy.
 */
export const rewriteWordPressUrl = (url: string): string => {
  if (!url) return url;

  // Build a list of internal origins that WordPress may use
  const internalOrigins: string[] = [];

  const serverApiUrl = process.env.BLOG_API_URL;
  if (serverApiUrl) {
    // Strip /wp-json/wp/v2 suffix if present
    const origin = serverApiUrl.replace(/\/wp-json\/wp\/v2\/?$/, '');
    if (origin) internalOrigins.push(origin);
  }

  // Default internal origin used in production
  internalOrigins.push('http://127.0.0.1:8081');
  internalOrigins.push('https://127.0.0.1:8081');
  internalOrigins.push('http://localhost:8081');
  internalOrigins.push('https://localhost:8081');

  const publicBase = getBlogUrl(); // e.g. "/blog" or "https://redem.c3sl.ufpr.br/blog"

  for (const origin of internalOrigins) {
    if (url.startsWith(origin)) {
      return url.replace(origin, publicBase);
    }
  }

  return url;
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

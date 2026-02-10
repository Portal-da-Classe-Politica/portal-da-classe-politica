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

/**
 * Public blog base URL used for rewriting internal WordPress URLs.
 * In production, NEXT_PUBLIC_BLOG_URL defaults to '/blog' which is relative;
 * we need an absolute public URL for rewriting, so we fall back to the
 * known public hostname.
 */
const getPublicBlogBaseUrl = (): string => {
  const publicUrl = process.env.NEXT_PUBLIC_BLOG_URL;
  if (publicUrl && publicUrl.startsWith('http')) {
    return publicUrl;
  }
  // Absolute public URL used in production
  return 'https://redem.c3sl.ufpr.br/blog';
};

/**
 * Rewrite internal WordPress URLs (e.g. http(s)://127.0.0.1:8081/...) to the
 * public blog URL so that images and links work in the browser.
 *
 * Handles URLs with or without the /blog prefix, and both http and https.
 */
export const rewriteWordPressUrl = (url: string): string => {
  if (!url) return url;

  const publicBase = getPublicBlogBaseUrl();

  // Match http(s)://127.0.0.1:8081/blog/... → replace with public base
  // Match http(s)://127.0.0.1:8081/...      → replace with public base
  // Also match http(s)://localhost:8081/...
  const internalPatterns = [
    /^https?:\/\/127\.0\.0\.1:\d+\/blog\//,
    /^https?:\/\/127\.0\.0\.1:\d+\//,
    /^https?:\/\/localhost:\d+\/blog\//,
    /^https?:\/\/localhost:\d+\//,
  ];

  for (const pattern of internalPatterns) {
    if (pattern.test(url)) {
      return url.replace(pattern, `${publicBase}/`);
    }
  }

  return url;
};

/**
 * Rewrite all internal WordPress URLs found inside an HTML string.
 * Useful for post content that may embed images/links with the internal address.
 */
export const rewriteWordPressHtml = (html: string): string => {
  if (!html) return html;

  const publicBase = getPublicBlogBaseUrl();

  // Global replace for all occurrences in the HTML
  return html
    .replace(/https?:\/\/127\.0\.0\.1:\d+\/blog\//g, `${publicBase}/`)
    .replace(/https?:\/\/127\.0\.0\.1:\d+\//g, `${publicBase}/`)
    .replace(/https?:\/\/localhost:\d+\/blog\//g, `${publicBase}/`)
    .replace(/https?:\/\/localhost:\d+\//g, `${publicBase}/`);
};

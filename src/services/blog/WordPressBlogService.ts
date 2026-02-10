import { WordPressPost, WordPressCategory, WordPressMedia, FormattedBlogPost } from './WordPressTypes';
import { getBlogApiUrl } from '@utils/blogUrl';

const WORDPRESS_API_BASE = getBlogApiUrl();

type SkipReason = 'build';

let skipWarningLogged = false;
let skipExecutionLogged = false;

const resolveSkipReason = (): SkipReason | null => {
  if (process.env.SKIP_WORDPRESS_ON_BUILD === 'true') {
    const currentPhase = process.env.NEXT_PHASE;

    if (currentPhase === 'phase-production-build') {
      return 'build';
    }

    if (!skipWarningLogged) {
      console.warn(
        'SKIP_WORDPRESS_ON_BUILD=true, but the current NEXT_PHASE is not "phase-production-build". Allowing WordPress fetches so runtime content keeps working.',
      );
      skipWarningLogged = true;
    }
  }

  return null;
};

const skipReason = resolveSkipReason();

const shouldSkipWordPress = (): boolean => {
  if (!skipReason) {
    return false;
  }

  if (!skipExecutionLogged) {
    console.log(
      `Skipping WordPress API calls because SKIP_WORDPRESS_ON_BUILD is enabled during the ${skipReason} phase.`,
    );
    skipExecutionLogged = true;
  }

  return true;
};

/**
 * Retry mechanism for fetch requests
 */
async function fetchWithRetry(url: string, options: RequestInit, retries: number = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Fetching ${url} (attempt ${i + 1}/${retries})`);
      const response = await fetch(url, options);

      if (response.ok) {
        console.log(`Successfully fetched ${url} on attempt ${i + 1}`);
        return response;
      }

      // If not the last attempt and got a server error, retry
      if (i < retries - 1 && response.status >= 500) {
        console.warn(`Server error ${response.status}, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        continue;
      }

      return response;
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error);

      // If not the last attempt, retry
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        continue;
      }

      throw error;
    }
  }

  throw new Error('All fetch attempts failed');
}

/**
 * Default fetch options to handle IPv6 issues and ensure better reliability
 */
const DEFAULT_FETCH_OPTIONS: RequestInit = {
  // Add timeout - increased for server environment
  signal: AbortSignal.timeout(30000), // 30 second timeout
  // Disable cache to prevent caching of failed requests
  cache: 'no-store',
};

/**
 * WordPress Blog Service
 * Integrates with WordPress REST API to fetch blog posts
 */
export const WordPressBlogService = {
  /**
   * Fetch all posts from WordPress blog
   * @param page - Page number (default: 1)
   * @param perPage - Posts per page (default: 100)
   * @param category - Filter by category slug
   * @param year - Filter by year
   * @returns Array of WordPress posts
   */
  getPosts: async (
    page: number = 1,
    perPage: number = 100,
    category?: string,
    year?: string,
  ): Promise<WordPressPost[]> => {
    // Skip WordPress calls if configured (useful for build environments with connectivity issues)
    if (shouldSkipWordPress()) {
      return [];
    }

    try {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
        _embed: 'true', // Include embedded data (featured image, author, etc.)
      });

      // Add category filter if provided
      if (category) {
        // First get category ID by slug
        const categories = await WordPressBlogService.getCategories();
        const categoryObj = categories.find(cat => cat.slug === category || cat.name === category);
        if (categoryObj) {
          params.append('categories', String(categoryObj.id));
        }
      }

      // Add year filter if provided
      if (year) {
        params.append('after', `${year}-01-01T00:00:00`);
        params.append('before', `${year}-12-31T23:59:59`);
      }

      const response = await fetchWithRetry(`${WORDPRESS_API_BASE}/posts?${params.toString()}`, {
        ...DEFAULT_FETCH_OPTIONS,
        next: { revalidate: 300 }, // Revalidate every 5 minutes instead of 1 hour
      });

      if (!response.ok) {
        console.error(`WordPress API error: ${response.status} ${response.statusText}`);
        console.error(`URL: ${WORDPRESS_API_BASE}/posts?${params.toString()}`);
        return []; // Return empty array instead of throwing
      }

      const data = await response.json();
      console.log(`Successfully fetched ${data.length} posts from WordPress`);
      return data;
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return [];
    }
  },

  /**
   * Fetch a single post by ID
   * @param id - WordPress post ID
   * @returns WordPress post or null
   */
  getPostById: async (id: string | number): Promise<WordPressPost | null> => {
    if (shouldSkipWordPress()) {
      return null;
    }

    try {
      const response = await fetchWithRetry(`${WORDPRESS_API_BASE}/posts/${id}?_embed=true`, {
        ...DEFAULT_FETCH_OPTIONS,
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        console.error(`WordPress API error fetching post ${id}: ${response.status}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching WordPress post:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      return null;
    }
  },

  /**
   * Fetch all categories
   * @returns Array of WordPress categories
   */
  getCategories: async (): Promise<WordPressCategory[]> => {
    if (shouldSkipWordPress()) {
      return [];
    }

    try {
      const response = await fetchWithRetry(`${WORDPRESS_API_BASE}/categories?per_page=100`, {
        ...DEFAULT_FETCH_OPTIONS,
        next: { revalidate: 3600 }, // Revalidate every hour
      });

      if (!response.ok) {
        console.error(`WordPress API error fetching categories: ${response.status}`);
        return []; // Return empty array instead of throwing
      }

      const data = await response.json();
      console.log(`Successfully fetched ${data.length} categories from WordPress`);
      return data;
    } catch (error) {
      console.error('Error fetching WordPress categories:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      return [];
    }
  },

  /**
   * Fetch featured media (image) for a post
   * @param mediaId - WordPress media ID
   * @returns WordPress media or null
   */
  getMedia: async (mediaId: number): Promise<WordPressMedia | null> => {
    if (shouldSkipWordPress()) {
      return null;
    }

    try {
      const response = await fetchWithRetry(`${WORDPRESS_API_BASE}/media/${mediaId}`, {
        ...DEFAULT_FETCH_OPTIONS,
        next: { revalidate: 86400 },
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching WordPress media:', error);
      return null;
    }
  },

  /**
   * Format WordPress post to internal blog post structure
   * @param post - WordPress post
   * @param categories - Array of all categories (optional, for name mapping)
   * @returns Formatted blog post
   */
  formatPost: async (post: WordPressPost, categories?: WordPressCategory[]): Promise<FormattedBlogPost> => {
    // Extract year from date
    const year = new Date(post.date).getFullYear().toString();

    // Get category names
    let categoryNames: string[] = [];
    if (categories && post.categories.length > 0) {
      categoryNames = post.categories
        .map(catId => categories.find(c => c.id === catId)?.name)
        .filter(Boolean) as string[];
    }

    // Get featured image URL
    let imageUrl = '/img/blog/default.png'; // Default fallback image

    // Try to get from embedded data first
    if ((post as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      imageUrl = (post as any)._embedded['wp:featuredmedia'][0].source_url;
    } else if (post.featured_media) {
      // Fallback: fetch media separately
      const media = await WordPressBlogService.getMedia(post.featured_media);
      if (media?.source_url) {
        imageUrl = media.source_url;
      }
    }

    // Clean up excerpt HTML
    const cleanExcerpt = post.excerpt.rendered
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&hellip;/g, '...') // Replace HTML entities
      .replace(/&[a-z]+;/gi, '') // Remove other HTML entities
      .trim();

    return {
      id: String(post.id),
      title: post.title.rendered,
      description: cleanExcerpt,
      content: post.content.rendered,
      img: imageUrl,
      categories: categoryNames,
      year,
      date: post.date,
      link: post.link,
      author: post.author,
      featured_media: post.featured_media,
    };
  },

  /**
   * Get all formatted blog posts
   * @param category - Filter by category
   * @param year - Filter by year
   * @returns Array of formatted blog posts
   */
  getAllFormatted: async (category?: string, year?: string): Promise<FormattedBlogPost[]> => {
    try {
      console.log('Fetching WordPress posts with filters:', { category, year });

      const [posts, categories] = await Promise.all([
        WordPressBlogService.getPosts(1, 100, category, year),
        WordPressBlogService.getCategories(),
      ]);

      console.log(`Formatting ${posts.length} posts`);

      if (posts.length === 0) {
        console.warn('No posts returned from WordPress API');
        return [];
      }

      const formatted = await Promise.all(
        posts.map(post => WordPressBlogService.formatPost(post, categories)),
      );

      console.log(`Successfully formatted ${formatted.length} posts`);
      return formatted;
    } catch (error) {
      console.error('Error getting formatted posts:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      return [];
    }
  },

  /**
   * Get formatted blog post by ID
   * @param id - Post ID
   * @returns Formatted blog post or null
   */
  getFormattedById: async (id: string | number): Promise<FormattedBlogPost | null> => {
    try {
      const [post, categories] = await Promise.all([
        WordPressBlogService.getPostById(id),
        WordPressBlogService.getCategories(),
      ]);

      if (!post) return null;

      return WordPressBlogService.formatPost(post, categories);
    } catch (error) {
      console.error('Error getting formatted post:', error);
      return null;
    }
  },
};

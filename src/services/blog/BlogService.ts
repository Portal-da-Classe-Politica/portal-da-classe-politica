import BlogDatabase from './BlogDatabase.json';

/**
 * TODO: DEPRECATED - Static Blog Service
 *
 * This service is deprecated and no longer used in the application.
 * The blog has been migrated to WordPress CMS for better content management.
 *
 * Use WordPressBlogService instead: @services/blog/WordPressBlogService
 *
 * Reason for deprecation:
 * - Static JSON-based blog required code deployments for every content update
 * - WordPress provides a better CMS solution with rich text editor
 * - WordPress API allows dynamic content updates without redeployment
 * - Better content management workflow for non-technical users
 *
 * This file is kept for reference and backward compatibility during migration.
 * Can be removed after ensuring all references have been updated.
 */

export const BlogService = {
  getBlogById: (id: string | number) => {
    const _id = String(id);
    return BlogDatabase.find(b => b.id === _id);
  },
  getBlogsByCategory: (category: string) => {
    return BlogDatabase.filter(b => b.categories.includes(category));
  },
  getBlogsByYear: (year: string) => {
    return BlogDatabase.filter(b => b.year === year);
  },
  getAllBlog: () => {
    return BlogDatabase;
  },

  getMdBlogById: () => {
    return fetch('./um.md');
  },
};

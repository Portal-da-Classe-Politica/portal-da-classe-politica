/**
 * TypeScript interfaces for WordPress REST API
 * Based on: https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2/posts
 */

export interface WordPressGuid {
  rendered: string;
}

export interface WordPressTitle {
  rendered: string;
}

export interface WordPressContent {
  rendered: string;
  protected: boolean;
}

export interface WordPressExcerpt {
  rendered: string;
  protected: boolean;
}

export interface WordPressAuthor {
  login: string;
  url: string;
}

export interface WordPressMeta {
  footnotes: string;
}

export interface WordPressLink {
  href: string;
}

export interface WordPressLinks {
  self: WordPressLink[];
  collection: WordPressLink[];
  about: WordPressLink[];
  author: WordPressLink[];
  replies: WordPressLink[];
  'version-history': WordPressLink[];
  'predecessor-version': WordPressLink[];
  'wp:featuredmedia': WordPressLink[];
  'wp:attachment': WordPressLink[];
  'wp:term': WordPressLink[];
  curies: any[];
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: WordPressGuid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressTitle;
  content: WordPressContent;
  excerpt: WordPressExcerpt;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: WordPressMeta;
  categories: number[];
  tags: number[];
  class_list: string[];
  _links: WordPressLinks;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: WordPressLinks;
}

export interface WordPressMedia {
  id: number;
  date: string;
  date_gmt: string;
  guid: WordPressGuid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WordPressTitle;
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  description: WordPressContent;
  caption: WordPressContent;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, any>;
  };
  source_url: string;
  _links: WordPressLinks;
}

/**
 * Formatted blog post for internal use
 * Adapts WordPress data to the existing blog structure
 */
export interface FormattedBlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  img: string;
  categories: string[];
  year: string;
  date: string;
  link: string;
  author: number;
  featured_media: number;
}

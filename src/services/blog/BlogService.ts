import BlogDatabase from './BlogDatabase.json';

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
};

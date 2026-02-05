import Link from 'next/link';

import { Heading, Icon, Text } from '@base';
import { routes } from '@routes';
import { WordPressBlogService } from '@services/blog/WordPressBlogService';
import { FormattedBlogPost } from '@services/blog/WordPressTypes';
import { getBlogPageUrl } from '@utils/blogUrl';
// TODO: Old static blog service - discontinued, now using WordPress API
// import { BlogService } from '@services/blog/BlogService';

import { CardPost } from '../CardPost';

export const SpecialContents = async ({ title = 'Conteúdos especiais' }: { title?: string }) => {
  // Get recent blog posts from WordPress
  // TODO: Old implementation used random static posts from JSON
  // Now fetching latest posts from WordPress API for better content management
  let blogs: FormattedBlogPost[] = [];
  try {
    const allBlogs = await WordPressBlogService.getAllFormatted();
    blogs = allBlogs.slice(0, 4); // Get first 4 posts
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    // Continue rendering without posts
  }

  // If no posts available, don't render the section
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row mb-7 gap-4 items-center">
        <Heading headingLevel={2} size={'H2'} className="font-bold ">
          {title}
        </Heading>
        <Link
          target="_blank"
          href={getBlogPageUrl('/index.php/publicacoes/')}
          className="text-orange content-end ml-auto flex"
        >
          <Text size={'C1'} className="flex font-bold">
            Ver todos artigos
            <Icon type="ArrowRightShort" className="ml-4" />
          </Text>
        </Link>
      </div>
      <div className="flex flex-col flex-wrap gap-2 items-center md:flex-row md:justify-between md:gap-3">
        {blogs.map(
          (blog, idx) =>
            blog && (
              <div key={idx} className="w-[280px] min-h-[400px]">
                <CardPost
                  href={routes.blogPost(blog.id)}
                  type="Tertiary"
                  title={blog.title}
                  subTitle={blog.description}
                  alt={blog.title}
                  category={blog.categories}
                  src={blog.img}
                />
              </div>
            ),
        )}
      </div>
    </div>
  );
};

import Link from 'next/link';

import { Heading, Icon, Text } from '@base';
import { routes } from '@routes';
import { BlogService } from '@services/blog/BlogService';

import { CardPost } from '../CardPost';

export const SpecialContents = async () => {
  const postIds = [1, 2, 1, 2];
  const blogs = await Promise.all(postIds.map(id => BlogService.getBlogById(id)));

  return (
    <div className="mt-10 md:mt-[120px]">
      <div className="flex flex-col md:flex-row mb-[30px] gap-4 items-center">
        <Heading headingLevel={2} size={'H2'} className="font-bold ">
          Conteúdos especiais
        </Heading>
        <Link href={routes.blog} className="text-orange content-end ml-auto flex">
          <Text size={'C1'} className="flex">
            Ver todos artigos
            <Icon type="ArrowRightShort" className="ml-4" />
          </Text>
        </Link>
      </div>
      <div className="flex flex-col flex-wrap gap-4 items-center md:flex-row md:justify-between md:gap-3">
        {blogs.map(
          (blog, idx) =>
            blog && (
              <div key={idx} className="w-[280px] h-[370px]">
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

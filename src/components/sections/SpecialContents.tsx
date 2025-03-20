import Link from 'next/link';

import { Heading, Icon, Text } from '@base';
import { routes } from '@routes';
import { BlogService } from '@services/blog/BlogService';

import { CardPost } from '../CardPost';

export const SpecialContents = async ({ title = 'Conteúdos especiais' }: { title?: string }) => {
  const getRandomNumbers = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers.slice(0, 4);
  };
  const postIds = getRandomNumbers();
  const blogs = await Promise.all(postIds.map(id => BlogService.getBlogById(id)));

  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row mb-7 gap-4 items-center">
        <Heading headingLevel={2} size={'H2'} className="font-bold ">
          {title}
        </Heading>
        <Link target="_blank" href={routes.blog} className="text-orange content-end ml-auto flex">
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
              <div key={idx} className="w-[280px] h-[400px]">
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

'use client';

import { useEffect } from 'react';
import { getBlogUrl } from '@utils/blogUrl';

/**
 * Blog Page - Redirects to external WordPress blog
 *
 * TODO: This page is deprecated and redirects to the new WordPress blog
 * The old static blog implementation has been discontinued in favor of WordPress CMS
 * which provides better content management, easier updates, and doesn't require deployments.
 *
 * Old implementation can be found in git history if needed for reference.
 */
const Page = () => {
  useEffect(() => {
    // Redirect to WordPress blog
    window.location.href = getBlogUrl();
  }, []);

  return (
    <main className="font-montserrat bg-grayMix1">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecionando para o blog...</h1>
          <p className="text-gray-600">
            Se não for redirecionado automaticamente,{' '}
            <a href={getBlogUrl()} className="text-orange underline">
              clique aqui
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;

// TODO: Old blog page implementation - discontinued
// The page below displayed a static list of blog posts from JSON
// Now redirects to WordPress blog for better content management
/*
'use client';

import { Container, Heading } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { Divider } from '@components/Divider';
import dynamic from 'next/dynamic';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Carousel } from '@components/carousel/Carousel';

const BlogPost = dynamic(() => import('@components/sections/BlogPosts'), {
  ssr: false,
});

const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-12 pt-4 relative bg-orange overflow-hidden">
        <DesignSemiCircle />
        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Heading size="H1" className="text-white font-bold">
              Explore conhecimento eleitoral baseado em dados científicos
            </Heading>
          </div>
        </Container>
      </section>

      <section className="pb-12 pt-12 md:pt-20">
        <Container>
          <div className="m-auto">
            <Carousel />
          </div>
        </Container>

        <Container className="flex flex-col items-center">
          <Divider type="darkerGray" top="small" bottom="small" />
          <BlogPost />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
*/

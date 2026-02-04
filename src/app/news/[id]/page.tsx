'use client';

import { useEffect } from 'react';

/**
 * Individual Blog Post Page - Redirects to external WordPress blog
 *
 * TODO: This page is deprecated and redirects to the WordPress blog post
 * The old static blog implementation with markdown files has been discontinued
 * in favor of WordPress CMS for better content management.
 */
const Page = ({ params }: any) => {
  const { id } = params;

  useEffect(() => {
    // Redirect to WordPress blog post
    window.location.href = `https://redem.c3sl.ufpr.br/blog/?p=${id}`;
  }, [id]);

  return (
    <main className="font-montserrat bg-grayMix1">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecionando para o artigo...</h1>
          <p className="text-gray-600">
            Se não for redirecionado automaticamente,{' '}
            <a href={`https://redem.c3sl.ufpr.br/blog/?p=${id}`} className="text-orange underline">
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

// TODO: Old blog post page implementation - discontinued
// The page below displayed markdown content from static files
// Now redirects to WordPress blog for better content management
/*
'use client';

import { Container } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import dynamic from 'next/dynamic';
import { SpecialContents } from '@components/sections/SpecialContents';

const MarkdownSection = dynamic(() => import('@components/sections/MarkdownSection'), {
  ssr: false,
});

const Page = ({ params }: any) => {
  const { id } = params;

  return (
    <main className="font-montserrat bg-grayMix1">
      <section className="pb-12 pt-4">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <MarkdownSection id={id} />

      <section className="mt-12 mb-20">
        <Container>
          <hr className="border-t-[3px] border-graMix2" />

          <SpecialContents title="Publicações relacionadas" />
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;
*/

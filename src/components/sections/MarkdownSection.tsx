'use client';

import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import 'github-markdown-css/github-markdown.css';

import { Container } from '@base/Container';

import '@components/css/custom-markdown.css';

const MarkdownSection = ({ id }: { id: string }) => {
  const [markdownContent, setMarkdownContent] = useState('');

  const getBlog = () => {
    import(`@services/blog/posts/${id}.md`).then(r => {
      setMarkdownContent(r.default);
    });
  };

  useEffect(() => {
    getBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pb-[45px] pt-12">
      <Container className="flex flex-col items-center markdown-body !m-auto">
        <Markdown>{markdownContent}</Markdown>
      </Container>
    </section>
  );
};

export default MarkdownSection;

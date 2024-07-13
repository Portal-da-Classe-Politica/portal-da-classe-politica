'use client';

import { Container } from '@base/Container';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import 'github-markdown-css/github-markdown.css';
import '../../components/css/custom-markdown.css';

const MarkdownSection = ({ id }: { id: string }) => {
  const [markdownContent, setMarkdownContent] = useState('');

  const getBlog = () => {
    console.log('uu quee');
    import(`../../services/blog/${id}.md`).then(r => {
      console.log('respotsa', r.default);
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

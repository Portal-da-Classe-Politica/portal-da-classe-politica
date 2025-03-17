'use client';

import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import 'github-markdown-css/github-markdown.css';

import { Container } from '@base/Container';

import '@components/css/custom-markdown.css';
import { Text } from '@base/text';
import { Heading } from '@base/Heading';

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
    <section className="pb-12 pt-12">
      <Container className="flex flex-col items-center markdown-body !m-auto">
        <Markdown
          options={{
            wrapper: ({ children }) => (
              <div style={{ fontFamily: 'Montserrat', lineHeight: '1.5' }}>
                <style>
                  {`
                  .markdown-body h1 {
                    border: none;
                    fontFamily: Montserrat;
                  }
                  .markdown-body h2 {
                    border: none;
                    fontFamily: Montserrat;
                  }
                  .markdown-body h3 {
                    border: none;
                    font-family: Montserrat;
                  }
                  .markdown-body h4 {
                    border: none;
                    font-family: Montserrat;
                  }
                  .markdown-body p {
                    line-height: 32px
                  }
                `}
                </style>
                {children}
              </div>
            ),
            overrides: {
              h1: {
                component: props => <Heading {...props} />,
              },
              h2: {
                component: props => <Heading {...props} headingLevel={2} size={'H2'} />,
              },
              h3: {
                component: props => <Heading {...props} headingLevel={3} size={'H3'} />,
              },
              p: {
                component: props => <Text {...props} size="B1" />,
              },
            },
          }}
        >
          {markdownContent}
        </Markdown>
      </Container>
    </section>
  );
};

export default MarkdownSection;

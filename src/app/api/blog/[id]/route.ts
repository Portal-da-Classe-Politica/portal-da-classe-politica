import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(_req: NextRequest, { params }: any) {
  const { id } = params;
  // console.info({ id });
  const blogPostsDirectory = path.join(process.cwd(), 'public', 'blog-posts');

  // Full path to the Markdown file based on the provided ID
  const filePath = path.join(blogPostsDirectory, `${id}.md`);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('batata', content);
  // const postFilePath = path.join(process.cwd(), 'service/blog', `1.md`);
  // console.log("blogogog", postFilePath)
  // const blog = BlogService.getBlogById(id);

  return NextResponse.json({ id });
}

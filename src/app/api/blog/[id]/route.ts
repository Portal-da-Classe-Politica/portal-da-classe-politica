import { BlogService } from '@services/blog/BlogService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, { params }: any) {
  const { id } = params;
  console.info({ id });

  const blog = BlogService.getBlogById(id);

  return NextResponse.json(blog);
}

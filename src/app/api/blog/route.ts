import { BlogService } from '@services/blog/BlogService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') || '';
  const _year = req.nextUrl.searchParams.get('year') || '';

  // Fix
  const blogs = BlogService.getBlogsByCategory(category);

  return NextResponse.json(blogs);
}

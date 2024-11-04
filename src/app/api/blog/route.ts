export const dynamic = 'force-dynamic';

import { BlogService } from '@services/blog/BlogService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') || '';
  const _year = req.nextUrl.searchParams.get('year') || '';

  // Fix
  const blogs = BlogService.getAllBlog()
    .filter(val => (category ? val.categories.includes(category) : val))
    .filter(val => (_year ? val.year === _year : val));

  return NextResponse.json(blogs);
}

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Never cache this route

import { WordPressBlogService } from '@services/blog/WordPressBlogService';
// TODO: Old static blog service - kept for reference but no longer used
// import { BlogService } from '@services/blog/BlogService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Blog API Route
 * Now integrates with WordPress REST API instead of static JSON
 * Old implementation commented below for reference
 */
export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') || '';
  const _year = req.nextUrl.searchParams.get('year') || '';

  console.log('API Route: Fetching blog posts with filters:', { category, _year });

  try {
    // Fetch posts from WordPress API
    const blogs = await WordPressBlogService.getAllFormatted(category || undefined, _year || undefined);

    console.log(`API Route: Successfully fetched ${blogs.length} posts`);

    return NextResponse.json(blogs, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('API Route: Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }

  // TODO: Old static implementation - discontinued because blog moved to WordPress
  // The static JSON approach made content management difficult and required code deployments
  // for every blog post update. WordPress provides a better CMS solution.
  //
  // const blogs = BlogService.getAllBlog()
  //   .filter(val => (category ? val.categories.includes(category) : val))
  //   .filter(val => (_year ? val.year === _year : val));
  // return NextResponse.json(blogs);
}

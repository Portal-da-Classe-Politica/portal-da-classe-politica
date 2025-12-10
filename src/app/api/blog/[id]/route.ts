export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const blogPostsDirectory = path.join(process.cwd(), 'public', 'blog-posts');

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  const filePath = path.join(blogPostsDirectory, `${id}.md`);
  const content = fs.readFileSync(filePath, 'utf8');

  return NextResponse.json({ id, content });
}

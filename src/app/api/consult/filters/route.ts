export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ConsultService } from '@services/consult/ConsultService';

export async function GET(req: NextRequest) {
  const dimension = req.nextUrl.searchParams.get('dimension');
  console.info('get:consult/filters dimension', dimension);

  const data = await ConsultService.getFilters(dimension || '');
  console.info('get:consult/filters', { data });

  return NextResponse.json(data);
}

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ConsultService } from '@services/consult/ConsultService';

export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get('id');
  const data = await ConsultService.getFiltersByRole(role || '');
  console.info('get:consult/filters/initial', { data });

  return NextResponse.json(data);
}

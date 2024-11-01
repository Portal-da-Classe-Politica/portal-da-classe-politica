export const dynamic = 'force-dynamic';

import { ConsultService } from '@services/consult/ConsultService';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await ConsultService.getFilters();
  console.info('get:consult/filters', { data });

  return NextResponse.json(data);
}

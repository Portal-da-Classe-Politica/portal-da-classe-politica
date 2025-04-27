export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ConsultService } from '@services/consult/ConsultService';

export async function GET() {
  const data = await ConsultService.getInitialFilters();
  console.info('get:consult/filters/initial', { data });

  return NextResponse.json(data);
}

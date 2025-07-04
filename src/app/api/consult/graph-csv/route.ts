export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ConsultService } from '@services/consult/ConsultService';

export async function GET(req: NextRequest) {
  const filters = req.url.split('?')[1];
  const data = await ConsultService.getGraphCsv(filters || '');
  console.info('get:consult/graph-csv', { data });

  return NextResponse.json(data);
}

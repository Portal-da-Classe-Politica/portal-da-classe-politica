import { ConsultService } from '@services/consult/ConsultService';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await ConsultService.getFilters();
  console.info('get:candidates', { data });

  return NextResponse.json(data);
}

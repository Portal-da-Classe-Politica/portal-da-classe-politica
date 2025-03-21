export const dynamic = 'force-dynamic';

import { AbrangencyService } from '@services/abrangency/AbrangencyService';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await AbrangencyService.getAbrangency();
  console.info('get:abrangency', { data });

  return NextResponse.json(data);
}

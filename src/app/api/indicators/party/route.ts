import { redem } from '@services/redem';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await redem.indicators.getPartyIndicators();
  console.info('get:indicators/finance', { data });

  return NextResponse.json(data);
}

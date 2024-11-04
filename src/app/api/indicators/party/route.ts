export const dynamic = 'force-dynamic';

import { IndicatorsService } from '@services/indicators/IndicatorsService';
import { redem } from '@services/redem';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await redem.indicators.getPartyIndicators();
  const indicators = (data?.data as any)?.indicators || [];

  const filters = IndicatorsService.parseIndicatorFilters(indicators);
  console.info('get:indicators/party filters', filters);

  return NextResponse.json(filters);
}

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

import { IndicatorsService } from '@services/indicators/IndicatorsService';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  console.info(`get:indicators/csv/[${id}] start`);

  const parsedParams = IndicatorsService.parseIndicatorParameters(req.nextUrl.searchParams);
  console.info(`get:indicators/csv/[${id}] parsedParams`, parsedParams);

  const data = await IndicatorsService.getindicatorsCsv(id, parsedParams);
  console.info(`get:indicators/csv/[${id}]`, JSON.stringify(data));

  return NextResponse.json(data);
}

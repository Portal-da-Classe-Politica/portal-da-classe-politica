export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

import { IndicatorsService } from '@services/indicators/IndicatorsService';

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  console.info(`get:indicators/[${id}] start`);

  const parsedParams = IndicatorsService.parseIndicatorParameters(req.nextUrl.searchParams);
  console.info(`get:indicators/[${id}] parsedParams`, parsedParams);

  const { data, path } = await IndicatorsService.getIndicatorById(id, parsedParams);
  console.info(`get:indicators/[${id}]`, JSON.stringify(data));

  return NextResponse.json({ request: path, result: data });
}

import { NextRequest, NextResponse } from 'next/server';

import { IndicatorsService } from '@services/indicators/IndicatorsService';

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  console.info(`get:indicators/[${id}] start`);

  const parsedParams = IndicatorsService.parseIndicatorParameters(req.nextUrl.searchParams);
  console.info(`get:indicators/[${id}] parsedParams`, parsedParams);

  const validation = IndicatorsService.validateIndicatorParameters(parsedParams);
  if (!validation.valid) {
    return NextResponse.json(
      {
        code: 400,
        message: 'Invalid Parameters',
        details: { reason: validation.error },
      },
      { status: 400 },
    );
  }

  const result = await IndicatorsService.getIndicatorById(id, parsedParams);
  console.info(`get:indicators/[${id}]`, result);

  return NextResponse.json(result);
}

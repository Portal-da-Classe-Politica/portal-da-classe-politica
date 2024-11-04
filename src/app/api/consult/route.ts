export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

import { ConsultService } from '@services/consult/ConsultService';
import { logError } from '@utils/logError';

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    console.info('get:consult type', type);

    const result = await ConsultService.consult(type ?? '', req.nextUrl.searchParams);
    console.info('get:consult result', result);

    return NextResponse.json(result);
  } catch (error) {
    logError('get:consult result', error as Error);
    return NextResponse.json([]);
  }
}

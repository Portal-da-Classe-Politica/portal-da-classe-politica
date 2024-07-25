import { ConsultService } from '@services/consult/ConsultService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const consult = req.nextUrl.searchParams.get('consulta');
    console.info('get:consult', consult);

    const result = await ConsultService.consult(consult ?? '', req.nextUrl.searchParams);
    console.info('get:consult result', result);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}

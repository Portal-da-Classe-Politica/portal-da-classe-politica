import { ConsultService } from '@services/consult/ConsultService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const initialYear = req.nextUrl.searchParams.get('initialYear') ?? '';
  const finalYear = req.nextUrl.searchParams.get('finalYear') ?? '';
  const dimension = req.nextUrl.searchParams.get('dimension') ?? '';
  console.info('get:candidates', { initialYear, finalYear, dimension });

  const data = await ConsultService.consultCandidateProfile({
    initialYear: Number(initialYear),
    finalYear: Number(finalYear),
    dimension: Number(dimension),
  });
  console.info('get:candidates', { data });

  return NextResponse.json(data);
}

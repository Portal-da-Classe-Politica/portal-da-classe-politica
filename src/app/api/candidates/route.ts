import { CandidateService } from '@services/candidates/CandidateService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') ?? '';
  const uf = req.nextUrl.searchParams.get('uf') ?? '';
  const page = req.nextUrl.searchParams.get('page') ?? '';
  const electoralUnitId = req.nextUrl.searchParams.get('electoralUnitId') ?? '';
  const abrangencyId = req.nextUrl.searchParams.get('abrangencyId') ?? '';
  console.info('get:candidates', { name, uf, page, electoralUnitId, abrangencyId });

  const data = await CandidateService.searchCandidates(name, uf, page, electoralUnitId, abrangencyId);
  console.info('get:candidates', { data });

  return NextResponse.json(data);
}

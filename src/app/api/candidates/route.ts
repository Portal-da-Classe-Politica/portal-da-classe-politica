import { CandidateService } from '@services/candidates/CandidateService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') || '';
  const uf = req.nextUrl.searchParams.get('uf') || '';
  const page = req.nextUrl.searchParams.get('page') || '';
  console.log({ name, uf });

  const data = await CandidateService.searchCandidates(name, uf, page);
  console.log('meu data', { data });

  return NextResponse.json(data);
}

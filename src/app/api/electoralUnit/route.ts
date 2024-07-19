import { ElectoralUnitService } from '@services/electoralUnit/ElectoralUnitService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const abrangecyId = req.nextUrl.searchParams.get('abrangecyId') ?? '';
  const uf = req.nextUrl.searchParams.get('uf') ?? '';
  console.info('get:electoralUnit', { abrangecyId, uf });

  const data = await ElectoralUnitService.getElectoralUnit(abrangecyId, uf);
  console.info('get:electoralUnit', { data });

  return NextResponse.json(data);
}

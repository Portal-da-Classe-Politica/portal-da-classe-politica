import { ElectoralUnitService } from '@services/electoralUnit/ElectoralUnitService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('abrangecyId') || '';
  const uf = req.nextUrl.searchParams.get('uf') || '';

  console.log({ id });

  const data = await ElectoralUnitService.getElectoralUnit(id, uf);
  console.log('meu data', { data });

  return NextResponse.json(data);
}

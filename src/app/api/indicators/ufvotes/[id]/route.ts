export const dynamic = 'force-dynamic';

import { redem } from '@services/redem';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const { data } = await redem.indicadores.getVotesByUf(id);
  const filters = (data?.data as any).map((d: any) => ({ value: d.id, label: d.nome }));

  console.info('get:indicadores/ufVotes/id filters', filters);

  return NextResponse.json(filters);
}

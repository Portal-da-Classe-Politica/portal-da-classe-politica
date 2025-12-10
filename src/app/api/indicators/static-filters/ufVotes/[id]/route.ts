export const dynamic = 'force-dynamic';

import { redem } from '@services/redem';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;

  const { data } = await redem.indicators.getVotesByUf(id);
  const filters = (data?.data as any).map((d: any) => ({ value: d.id, label: d.nome }));

  console.info('get:indicadores/ufVotes/id filters', filters);

  return NextResponse.json(filters);
}

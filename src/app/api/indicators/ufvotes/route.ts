export const dynamic = 'force-dynamic';

import { redem } from '@services/redem';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await redem.indicadores.getUfVotes();
  const filters = (data?.data as any).map((d: any) => ({ value: d.UF || d.label, label: d.label }));

  console.info('get:indicadores/ufVotes filters', filters);

  return NextResponse.json(filters);
}

export const dynamic = 'force-dynamic';

import { redem } from '@services/redem';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await redem.parties.getParties();
  const filters = (data?.data as any).map((d: any) => ({ value: d.id, label: d.sigla }));

  console.info('get:indicadores/party filters', filters);
  return NextResponse.json(filters);
}

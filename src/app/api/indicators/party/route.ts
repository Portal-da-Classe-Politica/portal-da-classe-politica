import { redem } from '@services/redem';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await redem.indicators.getPartyIndicators();
  console.info('get:indicators/finance', { data });

  const _data = data as any;

  const indicators = [];
  const jobs = {} as any;

  for (const ind of _data?.data?.indicators || []) {
    indicators.push({ value: ind.id, label: ind.nome });
    jobs[ind.id] = ind.cargos.map((c: any) => ({
      value: c.id,
      label: c.name,
      filterByUf: c.filter_by === 'UF' || c.agregacao_regional.includes('UF'),
      filterByCity: c.filter_by === 'MUNICIPIO',
    }));
  }

  return NextResponse.json({ indicators, jobs, raw: data });
}

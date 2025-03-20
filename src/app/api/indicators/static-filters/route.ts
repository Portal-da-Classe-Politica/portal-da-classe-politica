export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

import { redem } from '@services/redem';

export async function GET() {
  try {
    const [{ data: candidateFilters }, { data: ufVotes }, { data: parties }] = await Promise.all([
      redem.consult.getCandidateFilters(''),
      redem.indicators.getUfVotes(),
      redem.parties.getParties(),
    ]);

    const filters = {
      years: candidateFilters?.data?.anos?.values || [],
      ufs: parseUfs(candidateFilters.data?.estado?.values),
      ufVotes: (ufVotes?.data as any).map((d: any) => ({ value: d.UF || d.label, label: d.label })),
      parties: (parties?.data as any).map((d: any) => ({ value: d.id, label: d.sigla })),
    };
    console.info('get:indicators/static-filters filters', filters);

    return NextResponse.json(filters);
  } catch (error) {
    console.error('Error fetching candidate filters:', error);
    return NextResponse.json({ error: 'Failed to fetch filters' }, { status: 500 });
  }
}

const parseUfs = (ufs: any) => {
  const parsedUfs = ufs?.map((uf: any) => ({
    label: uf.nome,
    value: uf.id,
    code: uf.sigla_unidade_eleitoral,
  }));

  return parsedUfs.sort((a: any, b: any) => {
    if (b.code === 'BR') {
      return 1;
    }

    if (a.code === 'BR') {
      return -1;
    }

    return 0;
  });
};

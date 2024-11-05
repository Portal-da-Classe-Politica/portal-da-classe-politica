export const dynamic = 'force-dynamic';

import { redem } from '@services/redem';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await redem.consult.getCandidateFilters();

    const filters = {
      years: data?.data?.anos?.values || [],
      ufs: parseUfs(data.data?.estado?.values),
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

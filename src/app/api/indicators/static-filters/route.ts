import { redem } from '@services/redem';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await redem.consult.getCandidateFilters();

  const filters = {
    years: data?.data?.anos?.values || [],
    ufs: data.data?.estado?.values?.map((uf: any) => ({
      label: uf.nome,
      value: uf.id,
      code: uf.sigla_unidade_eleitoral,
    })),
  };
  console.info('get:indicators/static-filters filters', filters);

  return NextResponse.json(filters);
}

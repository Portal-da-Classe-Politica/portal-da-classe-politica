import { indicadoresPartidariosService } from '@services/indicadoresPartidarios/indicadorPartidarioService';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await indicadoresPartidariosService.getPartidoFilter();

  console.info('get:abrangency', { data });

  return NextResponse.json(data);
}

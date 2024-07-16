import { AbrangencyService } from '@services/abrangency/AbrangencyService';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await AbrangencyService.getAbrangency();
  console.log('meu data', { data });

  return NextResponse.json(data);
}

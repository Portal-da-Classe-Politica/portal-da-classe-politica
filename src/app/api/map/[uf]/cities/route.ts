import { NextRequest, NextResponse } from 'next/server';
import { GeoJsonMap } from '@components/map/geojson';

export async function GET(_req: NextRequest, { params: { uf } }: { params: { uf: string } }) {
  console.info('get:map', { uf });

  if (!GeoJsonMap.hasOwnProperty(uf)) {
    return NextResponse.json({ type: 'FeatureCollection', features: [] });
  }

  const layer = GeoJsonMap[uf as keyof typeof GeoJsonMap] as { type: string; features: any[] };

  return NextResponse.json(layer);
}

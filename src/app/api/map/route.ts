import { NextRequest, NextResponse } from 'next/server';
import { GeoJsonMap } from '@components/map/geojson';
import { CandidateService } from '@services/candidates/CandidateService';

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get('state') || '';
  const candidateId = req.nextUrl.searchParams.get('candidateId') || '';
  console.log({ state, candidateId });

  if (!GeoJsonMap.hasOwnProperty(state) || !candidateId) {
    return NextResponse.json({ type: 'FeatureCollection', features: [] });
  }

  const layer = GeoJsonMap[state as keyof typeof GeoJsonMap] as { type: string; features: any[] };
  const votes = await CandidateService.getCandidateLastElectionVoteByRegion(candidateId);

  votes.forEach(vote => {
    const feature = layer.features.find(feat => feat.properties.id === vote.codigo_ibge);
    if (feature) {
      feature.properties.votes = vote.votos;
    }
  });

  return NextResponse.json(layer);
}

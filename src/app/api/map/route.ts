export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { GeoJsonMap } from '@components/map/geojson';
import { CandidateService } from '@services/candidates/CandidateService';

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get('state') ?? '';
  const candidateId = req.nextUrl.searchParams.get('candidateId') ?? '';
  console.info('get:map', { state, candidateId });

  if (!GeoJsonMap.hasOwnProperty(state) || !candidateId) {
    return NextResponse.json({ type: 'FeatureCollection', features: [] });
  }

  const layer = GeoJsonMap[state as keyof typeof GeoJsonMap] as { type: string; features: any[] };
  const votes = await CandidateService.getCandidateLastElectionVoteByRegion(candidateId);

  // Create a ReadableStream to send chunks
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(`{"type": "FeatureCollection", "features": [`);

      for (let i = 0; i < layer.features.length; i++) {
        const feature = layer.features[i];

        const vote = votes.find(v => v.codigo_ibge === feature.properties.id);
        if (vote) {
          feature.properties.votes = vote.votos;
        }

        controller.enqueue(JSON.stringify(feature));

        if (i < layer.features.length - 1) {
          controller.enqueue(',');
        }
      }

      controller.enqueue(']}');
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  });
}

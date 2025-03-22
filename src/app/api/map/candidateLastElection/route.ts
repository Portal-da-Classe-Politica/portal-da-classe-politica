export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { CandidateService } from '@services/candidates/CandidateService';

export async function GET(req: NextRequest) {
  const candidateId = req.nextUrl.searchParams.get('candidateId') ?? '';
  console.info('get:map:candidateLastElection', { candidateId });

  if (!candidateId) {
    return NextResponse.json({ states: [], votes: [] });
  }

  const votes: any[] = await CandidateService.getCandidateLastElectionVoteByRegion(candidateId);

  const votesByState: Record<string, { uf: string; total: number; votes: any[] }> = {};
  for (const vote of votes) {
    const uf = vote?.estado && String(vote?.estado);
    if (!uf) {
      continue;
    }

    if (votesByState[vote?.estado]) {
      votesByState[vote?.estado].votes.push(vote);
      votesByState[vote?.estado].total += vote.votos || 0;
    } else {
      votesByState[vote?.estado] = { uf: vote?.estado, total: vote.votos || 0, votes: [vote] };
    }
  }

  return NextResponse.json(votesByState);
}

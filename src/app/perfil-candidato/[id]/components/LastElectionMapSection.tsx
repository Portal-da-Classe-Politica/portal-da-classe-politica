'use client';

import dynamic from 'next/dynamic';

import { Container, Heading } from '@base';
import { useCallback, useEffect, useState } from 'react';

const LastElectionMap = dynamic(
  () => import('@components/map/LastElectionMap').then(mod => mod.LastElectionMap),
  {
    ssr: false,
  },
);

export const LastElectionMapSection = ({ candidateId }: { candidateId: string }) => {
  const [votesByState, setVotesByState] = useState({ loading: true, data: null, error: null });

  const fetchMap = useCallback(() => {
    fetch(`/api/map/candidateLastElection?candidateId=${candidateId}`)
      .then(res => res.json())
      .then(data => {
        setVotesByState({ loading: false, data, error: null });
      })
      .catch(error => {
        setVotesByState({ loading: false, data: null, error });
      });
  }, [candidateId]);

  useEffect(() => {
    fetchMap();
  }, [fetchMap]);

  return votesByState.data ? (
    <section className="mt-8">
      <Container className="flex flex-col items-center">
        <div className={`flex flex-col w-full max-h-[800px] p-4 md:p-12 bg-white drop-shadow-lg rounded-lg`}>
          <Heading headingLevel={2} className="text-grayMix4 my-4">
            Mapa da votação da última eleição disputada
          </Heading>
          <LastElectionMap votesByState={votesByState.data} candidateId={candidateId} />
        </div>
      </Container>
    </section>
  ) : (
    <></>
  );
};

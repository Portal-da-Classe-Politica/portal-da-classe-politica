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

const LastCityElectionMap = dynamic(
  () => import('@components/map/LastCityElectionMap').then(mod => mod.LastElectionMap),
  {
    ssr: false,
  },
);

const cityMapJobs = ['PREFEITO', 'VEREADOR', 'VICE-PREFEITO'];
export const LastElectionMapSection = ({
  lastJob = '',
  candidateId,
}: {
  lastJob?: string;
  candidateId: string;
}) => {
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
          <Heading headingLevel={2} className="text-grayMix4 mb-4">
            Mapa da votação da última eleição disputada
          </Heading>
          {cityMapJobs.includes(lastJob.toLocaleUpperCase()) ? (
            <LastCityElectionMap votesByState={votesByState.data} candidateId={candidateId} />
          ) : (
            <LastElectionMap votesByState={votesByState.data} candidateId={candidateId} />
          )}
        </div>
      </Container>
    </section>
  ) : (
    <></>
  );
};

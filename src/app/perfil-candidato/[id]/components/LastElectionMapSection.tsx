'use client';

import './style.css'; // importação do CSS

import dynamic from 'next/dynamic';

import { Container, Heading } from '@base';
import { useCallback, useEffect, useState } from 'react';

export interface VotesByState {
  uf: string;
  total: number;
  votes: Vote[];
}

export interface Vote {
  codigo_ibge: string;
  estado: string;
  municipio: string;
  votos: number;
}

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
  const [votesByState, setVotesByState] = useState({ loading: true, data: null, error: null, show: false });

  const fetchMap = useCallback(() => {
    fetch(`/api/map/candidateLastElection?candidateId=${candidateId}`)
      .then(res => res.json())
      .then(data => {
        const show = Boolean(Object.keys(data).length);
        setVotesByState({ loading: false, data, error: null, show });
      })
      .catch(error => {
        setVotesByState({ loading: false, data: null, error, show: false });
      });
  }, [candidateId]);

  useEffect(() => {
    fetchMap();
  }, [fetchMap]);

  return votesByState.show && votesByState.data ? (
    <section className="mt-8">
      <Container className="flex flex-col items-center">
        <div className={`flex flex-col w-full max-h-[1000px] p-4 md:p-12 bg-white drop-shadow-lg rounded-lg`}>
          <Heading headingLevel={2} className="text-grayMix4 mb-4">
            Mapa da votação da última eleição disputada
          </Heading>
          {cityMapJobs.includes(lastJob.toLocaleUpperCase()) ? (
            <LastCityElectionMap votesByState={votesByState.data} candidateId={candidateId} />
          ) : (
            <LastElectionMap votesByState={votesByState.data} candidateId={candidateId} />
          )}
          <div
            className={
              'mt-10 ' +
              (Object.keys(votesByState.data).length > 1
                ? 'last-election-info-grid gap-2'
                : 'flex flex-wrap flex-col justify-center gap-2 md:flex-row')
            }
          >
            {(Object.keys(votesByState.data).length > 1
              ? [
                  { label: '1 - 999', color: 'rgba(255,224,217,0.8)' },
                  { label: '1.000 - 4.999', color: 'rgba(255,210,200,0.8)' },
                  { label: '5.000 - 9.999', color: 'rgba(255,190,170,0.8)' },
                  { label: '10.000 - 19.999', color: 'rgba(255,170,140,0.8)' },
                  { label: '20.000 - 49.999', color: 'rgba(255,148,109,0.8)' },
                  { label: '50.000 - 99.999', color: 'rgba(255,120,80,0.8)' },
                  { label: '100.000 - 199.999', color: 'rgba(255,102,58,0.8)' },
                  { label: '200.000 - 299.999', color: 'rgba(245,85,40,0.8)' },
                  { label: '300.000 - 499.999', color: 'rgba(235,88,47,0.8)' },
                  { label: '500.000 - 749.999', color: 'rgba(200,70,30,0.8)' },
                  { label: '750.000 - 999.999', color: 'rgba(180,60,25,0.8)' },
                  { label: '1.000.000 - 1.999.999', color: 'rgba(160,50,20,0.8)' },
                  { label: '2.000.000 - 2.999.999', color: 'rgba(140,40,15,0.8)' },
                  { label: '3.000.000 - 4.999.999', color: 'rgba(120,30,10,0.8)' },
                  { label: '5.000.000 - 9.999.999', color: 'rgba(80,20,5,0.8)' },
                  { label: '10.000.000+', color: 'rgba(60,10,2,0.8)' },
                ]
              : [
                  { label: '1 - 999', color: 'rgba(255,224,217,0.8)' },
                  { label: '1.000 - 9.999', color: 'rgba(255,148,109,0.8)' },
                  { label: '10.000 - 29.999', color: 'rgba(255,102,58,0.8)' },
                  { label: '30.000 - 49.999', color: 'rgba(245,85,40,0.8)' },
                  { label: '50.000 - 99.999', color: 'rgba(235,88,47,0.8)' },
                  { label: '100.000 - 199.999', color: 'rgba(160,50,20,0.8)' },
                  { label: '200.000+', color: 'rgba(120,30,10,0.8)' },
                ]
            ).map((scale, idx) => (
              <div key={idx} className={`flex items-center gap-2`} style={{ gridArea: `ga-${idx}` }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: scale.color,
                    border: '1px solid #ccc',
                  }}
                />
                <span style={{ fontSize: 13, color: '#444' }}>{scale.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  ) : (
    <></>
  );
};

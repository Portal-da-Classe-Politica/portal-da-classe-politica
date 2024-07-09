import React from 'react';
import { ButtonStyled, Text } from './base';

const candidates = [
  { name: 'Alexandre Rocha', party: 'PSOL', vice: 'Sergio Masanobu', position: 'Governador', status: 'Apto' },
  { name: 'Marcos João', party: 'PSOL', vice: 'Sergio Masanobu', position: 'Governador', status: 'Apto' },
  { name: 'Paulo Henrique', party: 'PSOL', vice: 'Sergio Masanobu', position: 'Governador', status: 'Apto' },
  {
    name: 'Professora Angela',
    party: 'PSOL',
    vice: 'Sergio Masanobu',
    position: 'Governador',
    status: 'Apto',
  },
  {
    name: 'Zé Felipe Santini',
    party: 'PSOL',
    vice: 'Sergio Masanobu',
    position: 'Governador',
    status: 'Apto',
  },
];

export interface TableStructure {
  headers: {
    title: string;
    className?: string;
    render?: () => React.ReactNode;
  }[];
  cells: {
    key: string;
    className?: string;
    render?: (_value: any, _row: any) => React.ReactNode;
  }[];
}

const TableComponent = ({
  structure,
  loading,
  values = [],
}: {
  structure: TableStructure;
  loading: boolean;
  values: any[];
}) => {
  return (
    <>
      <div className="container mx-auto p-8 hidden md:block bg-white shadow-xl rounded-lg">
        <div className="overflow-x-auto ">
          <table className="min-w-full">
            <thead>
              <tr className="w-full text-orange border-b-2 border-orange">
                {structure.headers.map((header, idx) =>
                  header.render ? (
                    header.render()
                  ) : (
                    <th key={idx} className={`text-left p-4 font-semibold ${header.className}`}>
                      {header.title}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Text>Loading!</Text>
              ) : (
                values.map((value, idx) => (
                  <tr key={idx} className="border-b flex flex-col sm:table-row">
                    {structure.cells.map(cell => (
                      <td key={cell.key} className={`p-4 font-semibold ${cell.className}`}>
                        {cell.render ? cell.render(value, values) : value[cell.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {candidates.map((candidate, index) => {
          return (
            <div key={index} className="w-full p-2  md:hidden bg-white shadow-xl rounded-lg flex-1">
              <div className="text-left p-2 ">
                <Text size="B1" className="font-bold">
                  NOME DO CANDIDATO:
                </Text>
                <Text size="B2"> {candidate.name}</Text>
              </div>
              <div className="text-left p-2 ">
                <Text size="B1" className="font-bold">
                  PARTIDO POLÍTICO:
                </Text>{' '}
                <Text size="B2">{candidate.party}</Text>
              </div>
              <div className="text-left p-2 ">
                <Text size="B1" className="font-bold">
                  VICE CANDIDATO:
                </Text>
                <Text size="B2"> {candidate.vice}</Text>
              </div>
              <div className="text-left p-2 ">
                <Text size="B1" className="font-bold">
                  CARGO:{' '}
                </Text>
                <Text size="B2"> {candidate.position}</Text>
              </div>
              <div className="text-left p-2 ">
                <Text size="B1" className="font-bold">
                  SITUAÇÃO:
                </Text>
                <Text size="B2"> {candidate.status}</Text>
              </div>
              <div className="p-2 text-center">
                <ButtonStyled size="small" style="fillOrange" className="w-[210px]">
                  <Text textType="span" size="L2">
                    MAIS INFORMAÇÕES
                  </Text>
                </ButtonStyled>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TableComponent;

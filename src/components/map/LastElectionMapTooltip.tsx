'use client';

export const LastElectionMapTooltip = ({ id, name, votes }: any) => {
  return (
    <div className="min-w-[300px] flex flex-col bg-white rounded-xl shadow-lg p-4">
      <div className="flex gap-2">
        <p className="font-bold">Nome:</p>
        <p className="capitalize">{name}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-bold">Votos:</p>
        <p>{votes ?? '-'}</p>
      </div>
      {id && (
        <div className="flex gap-2">
          <p className="font-bold">ID IBGE:</p>
          <p>{id}</p>
        </div>
      )}
    </div>
  );
};

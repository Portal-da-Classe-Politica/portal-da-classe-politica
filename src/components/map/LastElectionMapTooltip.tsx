export const LastElectionMapTooltip = ({ id, name, votes }: any) => {
  return (
    <div className="min-w-[250px] flex flex-col bg-white rounded-xl shadow-lg p-4">
      <div className="flex gap-2">
        <p className="font-bold">Nome:</p>
        <p>{name}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-bold">Votos:</p>
        <p>{votes ?? '-'}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-bold">ID IBGE:</p>
        <p>{id}</p>
      </div>
    </div>
  );
};

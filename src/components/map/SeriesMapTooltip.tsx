export const SeriesMapTooltip = ({ id, label, value }: any) => {
  return (
    <div className="min-w-[250px] flex flex-col bg-white rounded-xl shadow-lg p-4">
      {id !== 'BR' && (
        <div className="flex gap-2">
          <p className="font-bold">Estado</p>
          <p>{id}</p>
        </div>
      )}
      <div className="flex gap-2">
        <p className="font-bold">{label}</p>
        <p>{value ?? '-'}</p>
      </div>
    </div>
  );
};

import { Serie } from '@services/consult/getGraph';
import React, { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (_filters: { selectedSeries: Serie[] }) => void;
  series: Serie[];
  filteredSeries?: Serie[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  series,
  filteredSeries,
}) => {
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

  useEffect(() => {
    if (filteredSeries) {
      setSelectedSeries(filteredSeries.map(s => s.name));
    } else {
      setSelectedSeries(series.map(s => s.name));
    }
  }, [series, filteredSeries]);

  const handleCheckboxChange = (name: string) => {
    setSelectedSeries(prevSelected =>
      prevSelected.includes(name) ? prevSelected.filter(serie => serie !== name) : [...prevSelected, name],
    );
  };

  const handleApply = () => {
    const selectedSeriesObjects = series.filter(serie => selectedSeries.includes(serie.name));
    onApplyFilters({ selectedSeries: selectedSeriesObjects });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Aplicar Filtros</h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="mb-2">Filtrar por Partido:</h3>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
              {series.map(serie => (
                <label key={serie.name} className="flex items-center gap-1 p-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-orange accent-orange"
                    checked={selectedSeries.includes(serie.name)}
                    onChange={() => handleCheckboxChange(serie.name)}
                  />
                  <span className="text-sm font-medium">{serie.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>
            Cancelar
          </button>
          <button className="px-4 py-2 bg-orange text-white rounded-md" onClick={handleApply}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

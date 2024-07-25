import { ButtonStyled } from '@base/buttons';
import { Text } from '@base/text';
import { BoxIcon } from '@components/box/BoxIcon';
import { selectObject } from './ConsultSection';
import CompleteSelect from '@base/forms/CompleteSelect';

const FilterSidebar = ({
  sideFilters,
  sendData,
  selectedOption,
  handleFilterChange,
}: {
  sideFilters: {
    cargosIds: selectObject;
    categoriasOcupacoes: selectObject;
    genero: selectObject;
    isElected: selectObject;
    partidos: selectObject;
    unidadesEleitoraisIds: selectObject;
  };
  selectedOption: any;
  handleFilterChange: (_a: any, _b: any) => void;
  // eslint-disable-next-line
  sendData: (_value: any) => void;
}) => {
  return (
    <div>
      <label htmlFor="toggle" className="flex items-center mb-8 cursor-pointer md:cursor-default">
        <BoxIcon icon="Filter" iconSize="lg" className="bg-white shadow-lg text-orange" />
        <Text className="font-bold ml-2 text-center">Filtros</Text>
      </label>
      <input type="checkbox" id="toggle" className="hidden" />
      <div className="hidden-button overflow-hidden opacity-0 md:opacity-100 transition-all duration-500 md:max-h-max max-h-0">
        {Object.keys(sideFilters).map((key: any, index: number) => {
          const filter = sideFilters[key as keyof typeof sideFilters];
          return (
            <div className="max-w-[280px] mb-4" key={index}>
              <h3 className="font-semibold mb-1">{filter.title}</h3>
              <CompleteSelect
                placeholder="Selecione..."
                multiSelect={filter.type}
                selectedOption={selectedOption[key]}
                options={filter.values}
                onSelect={value => handleFilterChange(key, value)}
              />
            </div>
          );
        })}

        <ButtonStyled
          style="outlinedOrange"
          className="!bg-transparent hover:!text-orangeLight2"
          onClick={sendData}
        >
          <Text>Aplicar Filtro</Text>
        </ButtonStyled>
      </div>
    </div>
  );
};

export default FilterSidebar;

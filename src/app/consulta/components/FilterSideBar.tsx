import { ButtonStyled } from '@base/buttons';
import { Text } from '@base/text';
import { BoxIcon } from '@components/box/BoxIcon';
import CompleteSelect from '@base/forms/CompleteSelect';
import { Loader } from '@base/Loader';
import { Filter } from '../../types';

const FilterSidebar = ({
  loading = false,
  sideFilters,
  selectedOptions = {},
  onApplyFilter,
  handleFilterChange,
}: {
  loading?: boolean;
  selectedOptions: any;
  sideFilters: Filter[];
  handleFilterChange: (_a: any, _b: any) => void;
  // eslint-disable-next-line
  onApplyFilter: (_value: any) => void;
}) => {
  return (
    <div>
      <label htmlFor="toggle" className="flex items-center mb-8 cursor-pointer md:cursor-default">
        <BoxIcon icon="Filter" iconSize="lg" className="bg-white shadow-lg text-orange" />
        <Text className="font-bold ml-2 text-center">Filtros</Text>
      </label>
      <input type="checkbox" id="toggle" className="hidden" />
      {loading ? (
        <Loader />
      ) : (
        <div className="hidden-button opacity-0 md:opacity-100 transition-all duration-500 md:max-h-max max-h-0">
          {sideFilters.map((filter, index: number) => {
            return (
              <div className="max-w-[280px] mb-4" key={index}>
                <h3 className="font-semibold mb-1">{filter.title}</h3>
                <CompleteSelect
                  placeholder="Selecione..."
                  multiSelect={filter.type}
                  options={filter.values}
                  selectedOption={selectedOptions[filter.key]}
                  onSelect={value => handleFilterChange(filter.key, value)}
                />
              </div>
            );
          })}

          <ButtonStyled
            style="outlinedOrange"
            className="!bg-transparent hover:!text-orangeLight2"
            onClick={onApplyFilter}
          >
            <Text>Aplicar Filtros</Text>
          </ButtonStyled>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;

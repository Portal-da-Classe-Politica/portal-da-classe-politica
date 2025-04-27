import { ButtonStyled } from '@base/buttons';
import CompleteSelect from '@base/forms/CompleteSelect';
import { Loader } from '@base/Loader';
import { Text } from '@base/text';
import { BoxIcon } from '@components/box/BoxIcon';
import { CrossCriteriaPossibilitie, CrossCriterias } from '@services/consult/getFiltersByRole';
import { GraphData } from '@services/consult/getGraph';
import { Cargo, Dimension, InitialFiltersData } from '@services/consult/getInitialFilters';
import { useEffect, useState } from 'react';

const Filters = ({ sendGraphData }: { sendGraphData: (_data: GraphData) => void }) => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [crossCriterias, setCrossCriterias] = useState<CrossCriterias>();
  const [states, setStates] = useState<string[]>();
  const [earlyYears, setEarlyYears] = useState<number[]>();
  const [finalYears, setFinalYearss] = useState<number[]>();

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [graphLoading, setGraphLoading] = useState<boolean>(false);

  const [cargo, setCargo] = useState<Cargo>();
  const [dimension, setDimension] = useState<Dimension>();
  const [selectedCriterias, setSelectedCriterias] = useState<CrossCriteriaPossibilitie[]>([]);
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedEarlyYear, setSelectedearlyYear] = useState<number>();
  const [selectedFinalYear, setSelectedFinalYear] = useState<number>();

  useEffect(() => {
    getInitialData();
  }, []);

  async function getInitialData() {
    setInitialLoading(true);
    fetch(`/api/consult/filters/initial`)
      .then(res => res.json())
      .then(data => {
        const initialFilters = data.data as InitialFiltersData;
        setCargos(initialFilters.cargos);
        setDimensions(initialFilters.possibilities);
      })
      .finally(() => setInitialLoading(false));
  }

  async function getFiltersByRole(role: number) {
    fetch(`/api/consult/filters/role?id=${role}`)
      .then(res => res.json())
      .then(data => {
        const filtersByRole = data.data;
        resetOptions();
        setCrossCriterias(filtersByRole.cross_criterias);
        setStates(filtersByRole.filters.find((f: any) => f.parameter === 'uf')?.values);
        setEarlyYears(filtersByRole.filters.find((f: any) => f.parameter === 'initial_year')?.values);
        setFinalYearss(filtersByRole.filters.find((f: any) => f.parameter === 'final_year')?.values);
      });
  }

  async function getGraph() {
    if (graphLoading || !validateOptions()) {
      return;
    }

    let params = '';

    params += `dimension=${dimension!.value}`;
    params += `&cargoId=${cargo!.id}`;
    params += `&initial_year=${selectedEarlyYear}`;
    params += `&final_year=${selectedFinalYear}`;
    if (selectedState) {
      params += `&uf=${selectedState}`;
    }
    if (selectedCriterias.length) {
      selectedCriterias.forEach(criteria => {
        criteria.selections?.forEach(selection => {
          params += `&${criteria.parameter}=${selection.value}`;
        });
      });
    }

    setGraphLoading(true);

    fetch(`/api/consult/graph?${params}`)
      .then(res => res.json())
      .then(data => {
        const graph = data.data as GraphData;
        sendGraphData(graph);
      })
      .finally(() => {
        setGraphLoading(false);
      });
  }

  function resetOptions() {
    setSelectedCriterias([]);
    setSelectedState(undefined);
    setSelectedearlyYear(undefined);
    setSelectedFinalYear(undefined);
    setStates([]);
    setEarlyYears([]);
    setFinalYearss([]);
  }

  function validateOptions(): boolean {
    if (!cargo) {
      return false;
    }
    if (!dimension) {
      return false;
    }
    if (!selectedEarlyYear) {
      return false;
    }
    if (!selectedFinalYear) {
      return false;
    }
    if (selectedCriterias.length) {
      const valid = selectedCriterias.some(criterias => criterias.selections?.length);

      return valid;
    } else {
      return false;
    }
  }

  function getCargosOptions() {
    return cargos.map(cargo => ({
      label: cargo.nome_cargo,
      value: cargo.id,
    }));
  }

  function selectCargo(data: any) {
    setCargo(cargos.find(c => c.id == data));
    getFiltersByRole(data);
  }

  function checkEarlyDate(year: number) {
    if (selectedFinalYear == undefined) {
      setSelectedearlyYear(year);
    } else if (year <= selectedFinalYear!) {
      setSelectedearlyYear(year);
    }
  }

  function checkFinalDate(year: number) {
    if (selectedEarlyYear == undefined) {
      setSelectedFinalYear(year);
    } else if (year >= selectedEarlyYear!) {
      setSelectedFinalYear(year);
    }
  }

  function selectCriteria(value: any) {
    if (value.length >= crossCriterias!.max + 1) {
      return;
    }

    const selected = value.map((v: any) => crossCriterias?.possibilities.find(c => c.parameter == v.value));
    setSelectedCriterias(selected);
  }

  function updateCriteriasSelections(value: any, parameter: string) {
    const updatedCriterias = selectedCriterias.map(criteria => {
      if (criteria.parameter === parameter) {
        if (value.length < criteria.max + 1) {
          return {
            ...criteria,
            selections: value,
          };
        }
      }
      return criteria;
    });

    setSelectedCriterias(updatedCriterias);
  }

  return (
    <div className="flex flex-col gap-[18px] bg-orange p-5 rounded-lg shadow-lg">
      <label htmlFor="toggle" className="flex items-center mb-4 cursor-pointer md:cursor-default">
        <BoxIcon icon="Filter" iconSize="lg" className="bg-white shadow-lg text-orange" />
        <Text className="font-bold ml-2 text-center text-white">Filtros</Text>
      </label>

      {initialLoading ? (
        <div className="flex flex-col gap-[20px] justify-center items-center w-full h-[100px]">
          <Loader variant="Beat" color="white" />
          <Text size="B1" textType="span" className="text-white">
            Carregando filtros...
          </Text>
        </div>
      ) : (
        <>
          <div>
            <Text size="B1" textType="span" className="text-white">
              Selecione os filtros desejados para gerar o gráfico
            </Text>
          </div>
          <div className="flex gap-5 md:flex-row flex-col">
            {cargos.length ? (
              <div className="w-full">
                <h3 className="font-semibold mb-1 text-white">Cargo disputado</h3>
                <CompleteSelect
                  placeholder="Selecione uma opção"
                  multiSelect={false}
                  options={getCargosOptions()}
                  selectedOption={getCargosOptions().find(c => c.value === cargo?.id)}
                  onSelect={(value: any) => selectCargo(value.value)}
                />
              </div>
            ) : null}

            <div className="w-full">
              <h3 className="font-semibold mb-1 text-white">Estado (opcional)</h3>
              <CompleteSelect
                placeholder="Selecione uma opção"
                multiSelect={false}
                disabled={!states}
                options={states?.map(state => ({ label: state, value: state }))}
                selectedOption={states
                  ?.map(state => ({ label: state, value: state }))
                  .find(c => c.value == selectedState)}
                onSelect={(value: any) => setSelectedState(value.value)}
              />
            </div>

            <div className="w-full">
              <h3 className="font-semibold mb-1 text-white">Ano inicial</h3>
              <CompleteSelect
                placeholder="Selecione uma opção"
                multiSelect={false}
                disabled={!earlyYears}
                options={earlyYears?.map(year => ({ label: year, value: year }))}
                selectedOption={earlyYears
                  ?.map(year => ({ label: year, value: year }))
                  .find(c => c.value === selectedEarlyYear)}
                onSelect={(value: any) => checkEarlyDate(value.value)}
              />
            </div>

            <div className="w-full">
              <h3 className="font-semibold mb-1 text-white">Ano final</h3>
              <CompleteSelect
                placeholder="Selecione uma opção"
                multiSelect={false}
                disabled={!finalYears}
                options={finalYears?.map(year => ({ label: year, value: year }))}
                selectedOption={finalYears
                  ?.map(year => ({ label: year, value: year }))
                  .find(c => c.value === selectedFinalYear)}
                onSelect={(value: any) => checkFinalDate(value.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 select-none md:flex-row flex-col">
            <h3 className="font-semibold mb-1 text-white">O que deseja analisar:</h3>
            {dimensions.map((dim: any, idx: number) => (
              <label key={idx} className="flex items-center cursor-pointer ">
                <input
                  type="radio"
                  className="hidden peer"
                  name="dimension"
                  value={dim.value}
                  onChange={(event: any) => setDimension(dimensions.find(d => d.value == event.target.value))}
                />
                <div className="w-5 h-5 border-[3px] rounded-full flex items-center justify-center mr-2 peer-checked:bg-black peer-checked:border-white peer-checked:border-[3px]"></div>
                <Text size="B1" textType="span" className="text-white">
                  {dim.label}
                </Text>
              </label>
            ))}
          </div>

          <div className="w-full">
            <h3 className="font-semibold mb-1 text-white">Cruzamento com até 3 variáveis</h3>
            <CompleteSelect
              placeholder="Selecione os cruzamentos"
              multiSelect={'multiselect'}
              disabled={!crossCriterias}
              options={crossCriterias?.possibilities.map(data => ({
                label: data.label,
                value: data.parameter,
              }))}
              selectedOption={crossCriterias?.possibilities
                .map(data => ({ label: data.label, value: data.parameter }))
                .filter(c => selectedCriterias.map(s => s.parameter).includes(c.value))}
              onSelect={(value: any) => selectCriteria(value)}
            />
          </div>

          <div className="flex gap-5 md:flex-row flex-col">
            {selectedCriterias.length
              ? selectedCriterias.map((criteria, idx) => {
                  return (
                    <div key={idx} className="w-full">
                      <h3 className="font-semibold mb-1 text-white">{criteria.label}</h3>
                      <CompleteSelect
                        placeholder="Selecione uma opção"
                        multiSelect={criteria.type == 'multi_select' ? 'multiselect' : false}
                        options={criteria.values.map((data: any) => ({
                          label: data.label,
                          value: data.id,
                        }))}
                        selectedOption={criteria.selections}
                        onSelect={(value: any) => updateCriteriasSelections(value, criteria.parameter)}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <ButtonStyled
            style="fillBlack"
            className="w-full"
            onClick={getGraph}
            disabled={!validateOptions() ? true : false}
          >
            {graphLoading ? <Loader variant="Beat" color="white" /> : <Text>Aplicar Filtros</Text>}
          </ButtonStyled>
        </>
      )}
    </div>
  );
};

export default Filters;

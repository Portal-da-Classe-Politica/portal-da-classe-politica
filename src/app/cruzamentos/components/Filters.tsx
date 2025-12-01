import { ButtonStyled } from '@base/buttons';
import CompleteSelect from '@base/forms/CompleteSelect';
import { Loader } from '@base/Loader';
import { Text } from '@base/text';
import { BoxIcon } from '@components/box/BoxIcon';
import { CrossCriteriaPossibilitie, CrossCriterias } from '@services/consult/getFiltersByRole';
import { GraphData } from '@services/consult/getGraph';
import { Cargo, Dimension, InitialFiltersData } from '@services/consult/getInitialFilters';
import { useEffect, useState } from 'react';

interface FiltersProps {
  sendGraphData: (_graph: GraphData) => void;
  onParamsChange: (_str: string) => void;
}

const Filters = ({ sendGraphData, onParamsChange }: FiltersProps) => {
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [crossCriterias, setCrossCriterias] = useState<CrossCriterias>();
  const [states, setStates] = useState<string[]>();
  const [electoralUnits, setElectoralUnits] = useState<{ label: string; value: string }[]>();
  const [earlyYears, setEarlyYears] = useState<number[]>();
  const [finalYears, setFinalYearss] = useState<number[]>();

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [electoralLoading, setElectoralLoading] = useState<boolean>(false);
  const [graphLoading, setGraphLoading] = useState<boolean>(false);

  const [cargo, setCargo] = useState<Cargo>();
  const [dimension, setDimension] = useState<Dimension>();
  const [selectedCriterias, setSelectedCriterias] = useState<CrossCriteriaPossibilitie[]>([]);
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedUnit, setSelectedUnit] = useState<string>();
  const [selectedEarlyYear, setSelectedearlyYear] = useState<number>();
  const [selectedFinalYear, setSelectedFinalYear] = useState<number>();
  const [selectedRound, setSelectedRound] = useState<number>();

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    if (selectedEarlyYear && selectedEarlyYear < 2014) {
      setSelectedCriterias(prevCriterias =>
        prevCriterias.filter(criteria => criteria.parameter !== 'raca_id'),
      );
    }
  }, [selectedEarlyYear]);

  useEffect(() => {
    const isValid = cargo && [12, 11, 13].includes(cargo.id);

    if (cargo && selectedState && isValid) {
      setElectoralLoading(true);
      fetch(`/api/electoralUnit?abrangecyId=${cargo?.abrangenciumId}&uf=${selectedState}`)
        .then(res => res.json())
        .then(data => {
          setElectoralUnits(data);
        })
        .finally(() => {
          setElectoralLoading(false);
        });
    }
  }, [cargo, selectedState]);

  async function getInitialData() {
    setInitialLoading(true);
    fetch(`/api/consult/filters/initial`)
      .then(res => res.json())
      .then(data => {
        const initialFilters = data.data as InitialFiltersData;
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

    setGraphLoading(true);
    const params = mountParams();

    onParamsChange(params);

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

  function mountParams(): string {
    let params = '';

    params += `dimension=${dimension!.value}`;
    params += `&cargoId=${cargo!.id}`;
    params += `&initial_year=${selectedEarlyYear}`;
    params += `&final_year=${selectedFinalYear}`;

    if (selectedState) {
      params += `&uf=${selectedState}`;
    }
    if (selectedUnit) {
      params += `&unidade_eleitoral_id=${selectedUnit}`;
    }
    if (selectedRound) {
      params += `&round=${selectedRound}`;
    }
    if (selectedCriterias.length) {
      selectedCriterias.forEach(criteria => {
        criteria.selections?.forEach(selection => {
          params += `&${criteria.parameter}=${selection.value}`;
        });
      });
    }

    return params;
  }

  function resetOptions() {
    setSelectedCriterias([]);
    setSelectedState(undefined);
    setSelectedUnit(undefined);
    setSelectedearlyYear(undefined);
    setSelectedFinalYear(undefined);
    setSelectedRound(undefined);
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
      return selectedCriterias.every(criterias => criterias.selections?.length);
    }
    return true;
  }

  function getCargosOptions() {
    if (!dimension?.cargos) {
      return [];
    }
    return dimension.cargos.map(cargo => ({
      label: cargo.nome_cargo,
      value: cargo.id,
    }));
  }

  function selectCargo(data: any) {
    const selectedCargo = dimension?.cargos.find(c => c.id == data);
    setCargo(selectedCargo);
    // Limpa o turno se o cargo não tiver segundo turno
    if (selectedCargo && !selectedCargo.has_second_round) {
      setSelectedRound(undefined);
    }
    if (selectedCargo) {
      getFiltersByRole(data);
    }
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
    const selected = value.map((v: any) => {
      // Procura primeiro nos critérios já selecionados para manter as seleções
      const existingCriteria = selectedCriterias.find(c => c.parameter === v.value);
      if (existingCriteria) {
        return existingCriteria;
      }
      // Se não encontrar, cria um novo critério
      return crossCriterias?.possibilities.find(c => c.parameter == v.value);
    });
    setSelectedCriterias(selected);
  }

  function updateCriteriasSelections(value: any, parameter: string) {
    const updatedCriterias = selectedCriterias.map(criteria => {
      if (criteria.parameter === parameter) {
        return {
          ...criteria,
          selections: value,
        };
      }
      return criteria;
    });

    setSelectedCriterias(updatedCriterias);
  }

  function getFilteredCrossCriteriaPossibilities() {
    if (!crossCriterias?.possibilities) {
      return [];
    }

    // Se o ano inicial for menor que 2014, filtra fora a opção de raça
    if (selectedEarlyYear && selectedEarlyYear < 2014) {
      return crossCriterias.possibilities.filter(possibility => possibility.parameter !== 'raca_id');
    }

    return crossCriterias.possibilities;
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

          <div className="flex gap-4 select-none md:flex-row flex-col">
            <h3 className="font-semibold mb-1 text-white">O que deseja analisar: *</h3>
            {dimensions.map((dim: any, idx: number) => (
              <label key={idx} className="flex items-center cursor-pointer ">
                <input
                  type="radio"
                  className="hidden peer"
                  name="dimension"
                  value={dim.value}
                  onChange={(event: any) => {
                    const selectedDim = dimensions.find(d => d.value == event.target.value);
                    setDimension(selectedDim);
                    setCargo(undefined);
                    resetOptions();
                  }}
                />
                <div className="w-5 h-5 border-[3px] rounded-full flex items-center justify-center mr-2 peer-checked:bg-black peer-checked:border-white peer-checked:border-[3px]"></div>
                <Text size="B1" textType="span" className="text-white">
                  {dim.label}
                </Text>
              </label>
            ))}
          </div>

          <div className="flex gap-5 md:flex-row flex-col">
            {dimension?.cargos?.length ? (
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
              <div className="flex items-center gap-1 mb-1">
                <h3 className="font-semibold text-white">Estado</h3>
                <span className="text-white text-sm font-normal">(opcional)</span>
              </div>
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

            {electoralUnits?.length &&
            ((dimension?.value != 'votes' && cargo?.abrangenciumId == 2) || dimension?.value == 'votes') &&
            selectedState &&
            selectedState !== 'BR' ? (
              <div className="w-full">
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-semibold text-white">Município</h3>
                  <span className="text-white text-sm font-normal">(opcional)</span>
                </div>
                <CompleteSelect
                  placeholder="Selecione uma opção"
                  multiSelect={false}
                  disabled={electoralLoading}
                  options={electoralUnits?.map(state => state)}
                  selectedOption={electoralUnits.find(c => c.value == selectedUnit)}
                  onSelect={(value: any) => setSelectedUnit(value.value)}
                />
              </div>
            ) : null}

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

            {cargo?.has_second_round && (
              <div className="w-full">
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-semibold text-white">Turno</h3>
                  <span className="text-white text-sm font-normal">(opcional)</span>
                </div>
                <CompleteSelect
                  placeholder="Selecione o turno"
                  multiSelect={false}
                  options={[
                    { label: '1º Turno', value: 1 },
                    { label: '2º Turno', value: 2 },
                  ]}
                  selectedOption={
                    selectedRound
                      ? [
                          { label: '1º Turno', value: 1 },
                          { label: '2º Turno', value: 2 },
                        ].find(c => c.value === selectedRound)
                      : null
                  }
                  onSelect={(value: any) => setSelectedRound(value?.value)}
                />
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center gap-1 mb-1">
              <h3 className="font-semibold text-white">Cruzamento de variáveis</h3>
              <span className="text-white text-sm font-normal">(opcional)</span>
            </div>
            <CompleteSelect
              placeholder="Selecione os cruzamentos"
              multiSelect={'multiselect'}
              disabled={!crossCriterias}
              options={getFilteredCrossCriteriaPossibilities().map(data => ({
                label: data.label,
                value: data.parameter,
              }))}
              selectedOption={getFilteredCrossCriteriaPossibilities()
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
                      <div className="flex items-center gap-1 mb-1">
                        <h3 className="font-semibold text-white">{criteria.label}</h3>
                      </div>
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

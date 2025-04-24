'use client';

import { ButtonStyled, Container, Text } from '@base';
import CompleteSelect from '@base/forms/CompleteSelect';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Header } from '@components/sections/Header';
import { CrossCriteriaPossibilitie, CrossCriterias } from '@services/consult/getFiltersByRole';
import { Cargo, InitialFiltersData, Dimension } from '@services/consult/getInitialFilters';
import { useEffect, useState } from 'react';
import LineChart from './components/LineChart';
import { GraphData } from '@services/consult/getGraph';

// const cards = [
//   { text: 'Perfil dos Candidatos', src: '/img/consulta/Head.svg', imgWidth: 130, imgHeight: 110 },
//   { text: 'Resultados das Eleições', src: '/img/consulta/Chart.svg', imgWidth: 200, imgHeight: 110 },
//   { text: 'Financiamento de Campanha', src: '/img/consulta/Circles.svg', imgWidth: 130, imgHeight: 110 },
// ];

const Page = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [crossCriterias, setCrossCriterias] = useState<CrossCriterias>();
  const [states, setStates] = useState<string[]>();
  const [earlyYears, setEarlyYears] = useState<number[]>();
  const [finalYears, setFinalYearss] = useState<number[]>();

  // const [loading, setLoading] = useState(false);

  const [cargo, setCargo] = useState<Cargo>();
  const [dimension, setDimension] = useState<Dimension>();
  const [selectedCriterias, setSelectedCriterias] = useState<CrossCriteriaPossibilitie[]>([]);
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedEarlyYear, setSelectedearlyYear] = useState<number>();
  const [selectedFinalYear, setSelectedFinalYear] = useState<number>();

  const [graphData, setGraphData] = useState<GraphData>();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    fetch(`/api/consult/filters/initial`)
      .then(res => res.json())
      .then(data => {
        const initialFilters = data.data as InitialFiltersData;
        setCargos(initialFilters.cargos);
        setDimensions(initialFilters.possibilities);
      });
  }

  async function getFiltersByRole(role: number) {
    fetch(`/api/consult/filters/role?id=${role}`)
      .then(res => res.json())
      .then(data => {
        const filtersByRole = data.data;
        setCrossCriterias(filtersByRole.cross_criterias);
        setStates(filtersByRole.filters.find((f: any) => f.parameter === 'uf')?.values);
        setEarlyYears(filtersByRole.filters.find((f: any) => f.parameter === 'initial_year')?.values);
        setFinalYearss(filtersByRole.filters.find((f: any) => f.parameter === 'final_year')?.values);
      });
  }

  async function getGraph() {
    let params = '';

    params += `dimension=${dimension!.value}`;
    params += `&cargoId=${cargo!.id}`;
    params += `&initial_year=${selectedEarlyYear}`;
    params += `&final_year=${selectedFinalYear}`;
    if (selectedState) {
      params += `&UF=${selectedState}`;
    }
    if (selectedCriterias.length) {
      selectedCriterias.forEach(criteria => {
        criteria.selections?.forEach(selection => {
          params += `&${criteria.parameter}=${selection.value}`;
        });
      });
    }

    fetch(`/api/consult/graph?${params}`)
      .then(res => res.json())
      .then(data => {
        const graph = data.data as GraphData;
        setGraphData(graph);
      });
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
    <main className="font-montserrat">
      <div className="relative">
        <section className="bg-white pb-12 pt-4 ">
          <DesignSemiCircle theme="dark" />

          <Container>
            <Header style="dark" />
          </Container>
        </section>

        <section>
          {/* <Container>
                    <div className="flex flex-col justify-between items-center md:flex-row">
                      <div className="flex flex-2 flex-col">
                        <Heading size="D1" className="text-orange">
                          Explorando Dados Eleitorais
                        </Heading>
                        <Heading size="D2">Cruzamento e Visualização</Heading>
                      </div>
                      <div className="flex flex-1 pt-4 md:p-[30px]">
                        <Text size="S1">
                          Utilize filtros e variáveis para criar gráficos e mapas eleitorais personalizados
                        </Text>
                      </div>
                    </div>
                  </Container> */}
          {/* <Container className="my-12 pb-12">
                    <div className="flex justify-center md:justify-normal flex-wrap gap-8">
                      {cards.map((card, idx) => (
                        <BoxImageText
                          key={idx}
                          text={card.text}
                          src={card.src}
                          imgClassName="pt-4"
                          imgWidth={card.imgWidth}
                          imgHeight={card.imgHeight}
                        />
                      ))}
                    </div>
                  </Container> */}
        </section>
      </div>

      {cargos.length ? (
        <div className="w-full md:max-w-[280px] mb-4">
          <h3 className="font-semibold mb-1">Cargo disputado</h3>
          <CompleteSelect
            placeholder="Selecione um cargo"
            multiSelect={false}
            options={getCargosOptions()}
            selectedOption={getCargosOptions().find(c => c.value === cargo?.id)}
            onSelect={(value: any) => selectCargo(value.value)}
          />
        </div>
      ) : null}
      {states?.length ? (
        <div className="w-full md:max-w-[280px] mb-4">
          <h3 className="font-semibold mb-1">Estado (opcional)</h3>
          <CompleteSelect
            placeholder="Selecione um estado"
            multiSelect={false}
            options={states.map(state => ({ label: state, value: state }))}
            selectedOption={states
              .map(state => ({ label: state, value: state }))
              .find(c => c.value == selectedState)}
            onSelect={(value: any) => setSelectedState(value.value)}
          />
        </div>
      ) : null}

      {earlyYears ? (
        <div className="w-full md:max-w-[280px] mb-4">
          <h3 className="font-semibold mb-1">Ano inicial</h3>
          <CompleteSelect
            placeholder="Selecione um ano inicial da eleição"
            multiSelect={false}
            options={earlyYears.map(year => ({ label: year, value: year }))}
            selectedOption={earlyYears
              .map(year => ({ label: year, value: year }))
              .find(c => c.value === selectedEarlyYear)}
            onSelect={(value: any) => checkEarlyDate(value.value)}
          />
        </div>
      ) : null}

      {finalYears ? (
        <div className="w-full md:max-w-[280px] mb-4">
          <h3 className="font-semibold mb-1">Ano final</h3>
          <CompleteSelect
            placeholder="Selecione um ano final da eleição"
            multiSelect={false}
            options={finalYears.map(year => ({ label: year, value: year }))}
            selectedOption={finalYears
              .map(year => ({ label: year, value: year }))
              .find(c => c.value === selectedFinalYear)}
            onSelect={(value: any) => checkFinalDate(value.value)}
          />
        </div>
      ) : null}

      <div className="flex flex-col md:flex-row gap-4 select-none">
        <h3 className="font-semibold mb-1">O que deseja analisar?</h3>
        {dimensions.map((dim: any, idx: number) => (
          <label key={idx} className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="hidden peer"
              name="dimension"
              value={dim.value}
              onChange={(event: any) => setDimension(dimensions.find(d => d.value == event.target.value))}
            />
            <div className="w-4 h-4 border-[1px] border-orange rounded-full flex items-center justify-center mr-2 peer-checked:bg-orange"></div>
            <Text size="B1" textType="span" className="text-grayLight3">
              {dim.label}
            </Text>
          </label>
        ))}
      </div>

      <br />

      {crossCriterias ? (
        <div className="w-full md:max-w-[280px] mb-4">
          <h3 className="font-semibold mb-1">Cruzamento com até 3 variáveis</h3>
          <CompleteSelect
            placeholder="Selecione os cruzamentos"
            multiSelect={'multiselect'}
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
      ) : null}

      {selectedCriterias.length
        ? selectedCriterias.map((criteria, idx) => {
            return (
              <div key={idx} className="w-full md:max-w-[280px] mb-4">
                <h3 className="font-semibold mb-1">{criteria.label}</h3>
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

      <ButtonStyled
        style="outlinedOrange"
        className="!bg-transparent hover:!text-orangeLight2 mb-12"
        onClick={getGraph}
        disabled={false}
      >
        <Text>Aplicar Filtros</Text>
      </ButtonStyled>

      {graphData ? <LineChart graphData={graphData} title={graphData.title} /> : null}
    </main>
  );
};

export default Page;

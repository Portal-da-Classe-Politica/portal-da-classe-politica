'use client';

import { ButtonStyled, Container, Heading, Text } from '@base';
import CompleteSelect from '@base/forms/CompleteSelect';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Header } from '@components/sections/Header';
import { CrossCriteriaPossibilitie, CrossCriterias } from '@services/consult/getFiltersByRole';
import { Cargo, InitialFiltersData, Dimension } from '@services/consult/getInitialFilters';
import { useEffect, useState } from 'react';
import LineChart from './components/LineChart';
import { GraphData } from '@services/consult/getGraph';
import { BoxImageText } from '@components/box/BoxImageText';
import { BoxIcon } from '@components/box/BoxIcon';
import Image from 'next/image';

const cards = [
  { text: 'Perfil dos Candidatos', src: '/img/consulta/Head.svg', imgWidth: 130, imgHeight: 110 },
  { text: 'Resultados das Eleições', src: '/img/consulta/Chart.svg', imgWidth: 200, imgHeight: 110 },
  { text: 'Financiamento de Campanha', src: '/img/consulta/Circles.svg', imgWidth: 130, imgHeight: 110 },
];

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
          <Container>
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
          </Container>
          <Container className="my-12 pb-12">
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
          </Container>
        </section>
      </div>

      <section className="bg-grayMix1 px-[28px] py-[40px]" id="consult-section">
        <Container>
          <div className="mb-[40px] bg-orange p-5 rounded-lg shadow-lg">
            <label htmlFor="toggle" className="flex items-center mb-4 cursor-pointer md:cursor-default">
              <BoxIcon icon="Filter" iconSize="lg" className="bg-white shadow-lg text-orange" />
              <Text className="font-bold ml-2 text-center text-white">Filtros</Text>
            </label>
            <div className="mb-[15px]">
              <Text size="B1" textType="span" className="text-white">
                Selecione os filtros desejados para gerar o gráfico
              </Text>
            </div>
            <div className="flex gap-5 mb-[15px]">
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

            <div className="flex gap-4 select-none mb-[15px]">
              <h3 className="font-semibold mb-1 text-white">O que deseja analisar:</h3>
              {dimensions.map((dim: any, idx: number) => (
                <label key={idx} className="flex items-center cursor-pointer ">
                  <input
                    type="radio"
                    className="hidden peer"
                    name="dimension"
                    value={dim.value}
                    onChange={(event: any) =>
                      setDimension(dimensions.find(d => d.value == event.target.value))
                    }
                  />
                  <div className="w-5 h-5 border-[3px] rounded-full flex items-center justify-center mr-2 peer-checked:bg-black peer-checked:border-white peer-checked:border-[3px]"></div>
                  <Text size="B1" textType="span" className="text-white">
                    {dim.label}
                  </Text>
                </label>
              ))}
            </div>

            <div className="w-full mb-[15px]">
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
            </div>

            <div className="flex gap-5 mb-[30px]">
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

            <ButtonStyled style="fillBlack" className="w-full" onClick={getGraph} disabled={false}>
              <Text>Aplicar Filtros</Text>
            </ButtonStyled>
          </div>
        </Container>
      </section>

      <section className="bg-grayMix1 pb/*  */-20" id="graph-section">
        <Container>
          <div className="rounded-lg h-[600px] bg-white shadow-lg border">
            {graphData ? (
              <LineChart graphData={graphData} />
            ) : (
              <div className="flex flex-col gap-5 justify-center w-full h-full items-center">
                <Image
                  src={require('../../../public/img/GraphIcon.svg')}
                  alt="Ícone de gráfico"
                  width={100}
                  height={100}
                />
                <Text size="B1" textType="span" className="text-gray">
                  O gráfico será exibido aqui
                </Text>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Page;

'use client';

import { ButtonStyled, Container, Heading, Icon, Input, Select, Text } from '@base';
import TableComponent from '@components/Table';
import { Divider } from '@components/Divider';
import { useObjReducer } from '@hooks/useObjReducer';
import { cleanString } from '@utils/cleanString';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { routes } from '@routes';
import { Constants } from '@constants';

export const SearchSection = ({ title, filters }: { title: string; filters: any }) => {
  const [search, setSearch] = useObjReducer({ uf: '', name: '', abrangencyId: '', electoralUnitId: '' });
  const [result, setResult] = useState<any>([]);
  const [cities, setCities] = useState([]);
  const [abrangencyFilter, setAbrangencyFilter] = useState<
    {
      label: string;
      value: string;
      description: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onSearch = (page = 1) => {
    if (!loading) {
      setLoading(true);
      setCurrentPage(page);

      const searchParams = new URLSearchParams({ ...search, page: String(page) });
      fetch(`/api/candidates?${searchParams.toString()}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          setResult(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetch('/api/abrangency')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSearch({ abrangencyId: data[0].value });
        setAbrangencyFilter(data);
      });
    // eslint-disable-next-line
  }, []);

  const preSelectAbrangency = () => {
    return abrangencyFilter.filter(myAbra => String(myAbra?.value) === search.abrangencyId)[0]?.label;
  };

  useEffect(() => {
    if (search.abrangencyId === Constants.abrangency.municipal && search.uf) {
      fetch(`/api/electoralUnit?abrangecyId=${search.abrangencyId}&uf=${search.uf}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setCities(data);
        });
    }
  }, [search.uf, search.abrangencyId]);

  return (
    <>
      <section className="pb-[45px]">
        <Container>
          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Heading size="H1" className="text-white mt-4">
              {title}
            </Heading>
          </div>
          <div className="flex flex-col gap-2 items-center mt-16">
            <div className="flex flex-col md:flex-row gap-2 items-center text-center w-full">
              <div className="w-full ">
                <Select
                  placeholder={search.abrangencyId ? preSelectAbrangency() || '' : 'Selecionar Abrangencia'}
                  className="w-full"
                  options={abrangencyFilter}
                  buttonProps={{ style: 'fillGray', className: 'px-[8px] w-full' }}
                  prefixComponent={
                    <Text textType="span" size="B1" className="font-normal mr-2">
                      Abrangencia |
                    </Text>
                  }
                  suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                  onSelect={value => setSearch({ abrangencyId: String(value) })}
                />
              </div>
              <div className="w-full ">
                <Select
                  placeholder="Selecionar Estado"
                  className="w-full"
                  options={filters.estados}
                  buttonProps={{ style: 'fillGray', className: 'px-[8px] w-full' }}
                  prefixComponent={
                    <Text textType="span" size="B1" className="font-normal mr-2">
                      Estado |
                    </Text>
                  }
                  suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                  onSelect={value => setSearch({ uf: String(value) })}
                />
              </div>
              {search.abrangencyId === Constants.abrangency.municipal && (
                <div className="w-full ">
                  <Select
                    placeholder="Selecionar Cidade"
                    disabled={search.uf ? false : true}
                    options={cities}
                    className="w-full"
                    buttonProps={{ style: 'fillGray', className: 'px-[8px] w-full' }}
                    prefixComponent={
                      <Text textType="span" size="B1" className="font-normal mr-2">
                        Cidade |{' '}
                      </Text>
                    }
                    suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                    onSelect={value => setSearch({ electoralUnitId: String(value) })}
                  />
                </div>
              )}
            </div>
            <Input
              className="py-3"
              placeholder="Digite o nome do candidato..."
              label="nome candidato"
              onChange={evt => {
                setSearch({ name: cleanString(evt.target.value) });
              }}
            />
            <div className="flex">
              <ButtonStyled style="fillBlack" className="w-[200px]" onClick={() => onSearch()}>
                <Text textType="span" size="L2">
                  FAZER PESQUISA
                </Text>
              </ButtonStyled>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-[45px] pt-10 bg-grayMix1">
        <Container className="flex flex-col items-center">
          <Divider type="darkerGray" bottom="small" />
          <div className="flex text-orange justify-between w-full mb-10 flex-col md:flex-row gap-2 ">
            <div>
              <Text textType="span" size="L1" className="mr-2">
                Resultados encontrados:
              </Text>
              <Text textType="span" size="L1" className="font-bold">
                {result?.results?.length || 0} candidatos
              </Text>
            </div>
            {/** sem ordenação ainda */}
            {result.length > 0 && (
              <div>
                <Text textType="span" size="L1" className="mr-2">
                  Ordenar por:
                </Text>
                <Select
                  defaultValue="Alfabética A-Z"
                  placeholder="Alfabética A-Z"
                  options={[
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                  ]}
                  buttonProps={{
                    style: 'ghostOrange',
                    className: 'py-[4px] px-[4px] bg-white drop-shadow-md',
                  }}
                  suffixComponent={<Icon type="ArrowDown" className="ml-2  " />}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            <TableComponent
              values={result?.results}
              totalPages={result.totalPages}
              currentPage={currentPage}
              pageChange={(currentPage: number) => {
                onSearch(currentPage);
              }}
              loading={loading}
              structure={{
                headers: [
                  { title: 'NOME DO CANDIDATO', key: 'nomeCandidato' },
                  { title: 'PARTIDO POLÍTICO', key: 'partido' },
                  { title: 'CARGO', key: 'cargo' },
                  { title: 'SITUAÇÃO', key: 'situacao' },
                  { title: '' },
                ],
                cells: [
                  { key: 'nomeCandidato' },
                  { key: 'partido' },
                  { key: 'cargo' },
                  { key: 'situacao' },
                  {
                    key: '',
                    render: (_, row) => {
                      console.log(_, row);
                      return (
                        <Link href={routes.candidate(row.candidatoId)}>
                          <ButtonStyled size="small" style="fillOrange" className="w-[210px]">
                            <Text textType="span" size="L2">
                              MAIS INFORMAÇÕES
                            </Text>
                          </ButtonStyled>
                        </Link>
                      );
                    },
                  },
                ],
              }}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

'use client';

import { ButtonStyled, Container, Heading, Icon, Input, Select, Text } from '@base';
import TableComponent from '@components/Table';
import { Divider } from '@components/Divider';
import { useObjReducer } from '@hooks/useObjReducer';
import { cleanString } from '@utils/cleanString';
import { useState } from 'react';
import Link from 'next/link';
import { routes } from '@routes';

export const SearchSection = ({ title, filters }: { title: string; filters: any }) => {
  const [search, setSearch] = useObjReducer({ uf: '', job: '', name: '' });
  // const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = () => {
    if (!loading) {
      setLoading(true);

      fetch(`/api/candidates?name=${search.name}&uf=${search.uf}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setResult(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <section className="pb-[45px]">
        <Container>
          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Heading size="H1" className="text-white mt-4">
              {title}
            </Heading>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 items-center mt-16">
            <div className="flex flex-col md:flex-row gap-2 items-center text-center">
              <div className="w-[270px]">
                <Select
                  placeholder="Selecionar Estado"
                  options={filters.estados}
                  buttonProps={{ style: 'fillGray', className: 'px-[8px]' }}
                  prefixComponent={
                    <Text textType="span" size="B1" className="font-normal mr-2">
                      Estado |
                    </Text>
                  }
                  suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                  onSelect={value => setSearch({ uf: String(value) })}
                />
              </div>
              <div className="w-[270px]">
                <Select
                  placeholder="Selecionar Cargo"
                  options={filters.cargos}
                  buttonProps={{ style: 'fillGray', className: 'px-[8px]' }}
                  prefixComponent={
                    <Text textType="span" size="B1" className="font-normal mr-2">
                      Cargo |{' '}
                    </Text>
                  }
                  suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
                  onSelect={value => setSearch({ job: String(value) })}
                />
              </div>
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
              <ButtonStyled style="fillBlack" className="w-[200px]" onClick={onSearch}>
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
                5 candidatos
              </Text>
            </div>
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
                buttonProps={{ style: 'ghostOrange', className: 'py-[4px] px-[4px] bg-white drop-shadow-md' }}
                suffixComponent={<Icon type="ArrowDown" className="ml-2  " />}
              />
            </div>
          </div>
          <div className="w-full">
            <TableComponent
              values={result}
              loading={loading}
              structure={{
                headers: [
                  { title: 'NOME DO CANDIDATO' },
                  { title: 'PARTIDO POLÍTICO' },
                  { title: 'CARGO' },
                  { title: 'SITUAÇÃO' },
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

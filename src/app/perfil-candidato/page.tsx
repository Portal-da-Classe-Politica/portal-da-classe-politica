'use client';

import { ButtonStyled, Container, Heading, IconAwesome, Input, Select, Text } from '@base';
import { Header } from '@/components/Header';
import TableComponent from '@/components/Table';
import { GetInContact } from '@/components/sections/GetInContact';
import Divider from '@/components/Divider';

const Page = () => {
  return (
    <main className="font-montserrat bg-orange">
      <section className="pb-[45px] pt-4">
        <Container>
          <Header style="light" />

          <div className="flex flex-col mt-12 justify-between items-center text-center">
            <Heading size="H1" className="text-white mt-4">
              Lorem ipsum dolor sit consectetur adipiscing elit. Suspendisse non odio amet massa lobortis.{' '}
            </Heading>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 items-center mt-16">
            <div className="flex flex-col md:flex-row gap-2 items-center text-center">
              <div className="w-[270px]">
                <Select
                  placeholder="Selecionar Estado"
                  options={[
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                  ]}
                  buttonProps={{ style: 'fillGray', className: 'px-[8px]' }}
                  prefixComponent={
                    <>
                      <Text textType="span" size="B1" className="font-normal">
                        Estado |
                      </Text>
                    </>
                  }
                  suffixComponent={<IconAwesome type="ArrowDown" className="ml-2" />}
                />
              </div>
              <div className="w-[270px]">
                <Select
                  placeholder="Selecionar Estado"
                  options={[
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                    { value: 'value', label: 'label' },
                  ]}
                  buttonProps={{ style: 'fillGray', className: 'px-[8px]' }}
                  prefixComponent={
                    <>
                      <Text textType="span" size="B1" className="font-normal">
                        Estado |
                      </Text>
                    </>
                  }
                  suffixComponent={<IconAwesome type="ArrowDown" className="ml-2" />}
                />
              </div>
            </div>
            <Input placeholder="Digite o nome do candidato..." label="nome candidato" className="py-3" />
            <div className="flex">
              <ButtonStyled style="fillBlack" className="w-[200px]">
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
                suffixComponent={<IconAwesome type="ArrowDown" className="ml-2  " />}
              />
            </div>
          </div>
          <div className="w-full">
            <TableComponent />
          </div>
        </Container>
      </section>
      <GetInContact />
    </main>
  );
};

export default Page;

'use client';
import { Button } from '@base/buttons';
import { Input, Select } from '@base/forms';
import { Heading } from '@base/Heading';
import { Icon } from '@base/Icon';
import { Text } from '@base/text';
import { BoxIcon } from '@components/box/BoxIcon';
import { CardPost } from '@components/CardPost';
import { ChipContainer } from '@components/ChipContainer';
import { useEffect, useState } from 'react';

const filterCategoria = ['Cruzamentos', 'Indicadores', 'Perfil dos candidatos', 'Blog e conteúdos especiais'];
const filterYear = ['2024', '2023', '2022'];

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState<any>([]);
  const [filterType, setFilterType] = useState('cres');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const onSearch = () => {
    fetch(`/api/blog-posts?category=${selectedCategory}&year=${selectedYear}`)
      .then(res => res.json())
      .then(data => setBlogPost(data));
  };

  const sortedMethod = (a: any, b: any) => {
    if (filterType === 'cres') {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
    } else {
      if (a.title > b.title) {
        return -1;
      }
      if (a.title < b.title) {
        return 1;
      }
    }

    return 0;
  };

  useEffect(() => {
    onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedYear]);

  return (
    <div className="flex  md:flex-row flex-col mt-4 gap-4">
      <div className="lg:w-[20%] md:w-[30%] w-full">
        <div className="flex">
          <BoxIcon icon="Slider" size={10} iconSize="xl" className="bg-white mr-2 text-orange shadow-lg" />
          <Text className="font-bold self-center"> Filtros</Text>
        </div>
        <div>
          <Heading size="H6" headingLevel={2} className="font-bold mt-4">
            Categoria
          </Heading>
        </div>
        <div className="flex flex-wrap mt-6 gap-2 mb-6 [&_div]:mb-2">
          {filterCategoria.map((cat, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCategory(pastValue => (cat === pastValue ? '' : cat));
              }}
            >
              <ChipContainer type={cat === selectedCategory ? 'full' : 'ghost'} className="!mr-0">
                {cat}
              </ChipContainer>
            </div>
          ))}
        </div>
        <div>
          <Heading size="H6" headingLevel={2} className="font-bold mt-4">
            Ano
          </Heading>
        </div>
        <div className="flex flex-wrap mt-6 gap-2 mb-6">
          {filterYear.map((myYear, index) => (
            <div
              key={index}
              onClick={() => setSelectedYear(pastValue => (myYear === pastValue ? '' : myYear))}
            >
              <ChipContainer type={myYear === selectedYear ? 'full' : 'ghost'} className="!mr-0">
                {myYear}
              </ChipContainer>
            </div>
          ))}
        </div>
        <div>
          <Heading size="H6" headingLevel={2} className="font-bold mt-4">
            Newsletter
          </Heading>
          <Text size="B2" className="mt-2">
            Inscreva-se agora para não perder nenhum artigo do nosso blog, tutoriais exclusivos e análises
            detalhadas sobre eleições, financiamento político e muito mais!
          </Text>
        </div>
        <div className="flex flex-wrap mt-6 gap-2 mb-6 justify-center md:justify-normal">
          <form>
            <Input placeholder="Digite seu e-mail..." label="email" />

            <Button className="w-full mt-3" color="orange" text="Assinar newsletter" />
          </form>
        </div>
      </div>
      <div className="lg:w-[80%] md:w-[70%] w-full">
        <div className="justify-end flex">
          <div className="mb-4">
            <div className=" w-[120px] inline-block">
              <Text textType="span" size="L1" className="mr-2 w-full">
                Ordenar por:
              </Text>
            </div>
            <div className="inline-block">
              <Select
                defaultValue="Alfabética A-Z"
                placeholder="Alfabética A-Z"
                options={[
                  { label: 'Alfabética A-Z', value: 'cres' },
                  { label: 'Alfabética Z-A', value: 'decr' },
                ]}
                onSelect={val => setFilterType(val as string)}
                buttonProps={{
                  style: 'ghostOrange',
                  className: 'py-1 px-1 bg-white drop-shadow-md',
                }}
                suffixComponent={<Icon type="ArrowDown" className="ml-2  " />}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(302px,1fr))] gap-4 place-items-center">
          {blogPost.sort(sortedMethod).map((values: any, index: number) => {
            return (
              <div className="md:h-[370px] w-[302px] " key={index}>
                <CardPost
                  alt={values.title}
                  type="Tertiary"
                  title={values.title}
                  category={values.categories}
                  subTitle={values.description}
                  src={values.img}
                  // Updated to external WordPress blog link
                  href={`https://redem.c3sl.ufpr.br/blog/?p=${values.id}`}
                  // TODO: Old internal route - discontinued
                  // href={`/news/${values.id}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

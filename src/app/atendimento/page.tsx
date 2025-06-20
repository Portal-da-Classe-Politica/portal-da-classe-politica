'use client';

import { ButtonStyled, Container, Heading, Text, Input, TextArea, TextParagraphImage } from '@base';
import { Header } from '@components/sections/Header';
import { LineItem } from '@components/LineItem';
import { BoxIconText } from '@components/box/BoxIconText';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Constants } from '@constants';
import { useState } from 'react';
import { EmailBodyData } from '@services/contact/sendEmail';
import Link from 'next/link';
import { BoxIcon } from '@components/box/BoxIcon';

const Atendimento = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (formData.name.length > 100) {
      alert('O nome não pode exceder 100 caracteres.');
      return;
    }

    if (formData.topic.length > 100) {
      alert('O assunto não pode exceder 100 caracteres.');
      return;
    }

    if (formData.message.length > 800) {
      alert('A mensagem não pode exceder 800 caracteres.');
      return;
    }

    const body: EmailBodyData = {
      nome: formData.name,
      email: formData.email,
      mensagem: formData.message,
      assunto: formData.topic,
    };

    try {
      const response = await fetch('/api/contact/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('Email enviado com sucesso!');
        setFormData({ name: '', email: '', topic: '', message: '' });
      } else {
        alert('Falha ao enviar o email. Por favor, tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      alert('Erro ao enviar o email.');
    }
  };

  return (
    <main>
      <div className="relative">
        <section className="bg-orange pt-[15px] ">
          <DesignSemiCircle />

          <Container>
            <Header style="light" />
          </Container>
        </section>
        <section className="bg-orange py-20">
          <Container className={'md:w-[770px]'}>
            <div className="text-white text-center mb-11">
              <Text textType="span" size="S1" className="font-bold text-[30px] mb-[22px]">
                ATENDIMENTO
              </Text>{' '}
              <Heading headingLevel={2} className="font-bold text-[30px] mb-[22px]">
                Precisando de ajuda? Escolha o método de atendimento
              </Heading>{' '}
            </div>
            <div className="flex flex-wrap items-center justify-evenly gap-4 md:gap-4">
              <div className="w-[160px] h-[160px]">
                <BoxIconText text="Atendimento Redem" iconType="Headset" />
              </div>
              <div className="w-[160px] h-[160px]">
                <BoxIconText text="Reportar Erro" iconType="Error" />
              </div>
              <div className="w-[160px] h-[160px]">
                <BoxIconText text="Elogios ao projeto" iconType="Star" />
              </div>
            </div>
          </Container>
        </section>
      </div>
      <section className="bg-[#F4F4F4]">
        <Container className="pt-10 pb-10 md:pb-28">
          <Heading headingLevel={2}>Informações de Contato</Heading>
          <div className="flex mb-10 md:mb-28 flex-col-reverse md:flex-row">
            <div className="flex-1">
              <LineItem className="my-7">
                <Text size="B1" className="font-bold mb-2">
                  Telefone
                </Text>
                <Text>+55 (41) 3234-1241</Text>
              </LineItem>
              <LineItem className="mb-7">
                <Text size="B1" className="font-bold mb-2">
                  WhatsApp
                </Text>
                <Text>+55 (41) 98234-1241</Text>
              </LineItem>
              <LineItem className="mb-7">
                <Text size="B1" className="font-bold mb-2">
                  E-mail
                </Text>
                <Text>portaldaclassepolitica@gmail.com</Text>
              </LineItem>
              <LineItem className="mb-7">
                <Text size="B1" className="font-bold mb-2">
                  Endereço
                </Text>
                <Text>Rua João José Massaneiro, 1377</Text>
                <Text>Centro - São José dos Pinhais</Text>
              </LineItem>
              <LineItem>
                <Text size="B1" className="font-bold mb-2">
                  Redes Sociais
                </Text>
                <div className="flex gap-2 justify-between text-orange">
                  <Link target="_blank" href={Constants.links.facebook}>
                    <BoxIcon icon="Facebook" iconSize="2xl" />
                  </Link>
                  <Link target="_blank" href={Constants.links.instagram}>
                    <BoxIcon icon="Instagram" iconSize="2xl" />
                  </Link>
                  <Link target="_blank" href={Constants.links.linkedin}>
                    <BoxIcon icon="LinkedIn" iconSize="2xl" />
                  </Link>
                </div>
              </LineItem>
            </div>
            <div className="flex-1">
              <Text size="S1" className="font-bold hidden md:flex">
                Informações de Contato
              </Text>
              <form className="flex flex-col gap-7 mt-6 mb-9" onSubmit={handleSubmit}>
                <div className="flex gap-5 flex-col md:flex-row">
                  <Input
                    placeholder="Nome Completo"
                    label="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                  />
                  <Input
                    placeholder="Email"
                    label="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-5 flex-col md:flex-row">
                  <Input
                    placeholder="Assunto"
                    label="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    maxLength={100}
                  />
                </div>
                <div>
                  <TextArea
                    placeholder="Mensagem"
                    label="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={800}
                  />
                </div>
                <ButtonStyled style="fillOrange" type="submit">
                  Enviar
                </ButtonStyled>
              </form>
            </div>
          </div>
          <TextParagraphImage
            link="/blog/promo-part"
            src={Constants.images.promoPart}
            header={
              'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
            }
            texts={[
              'Os partidos políticos desempenham um papel crucial na política, controlando recursos importantes como cargos, seleção de candidatos (as) e financiamento. Desde 2009, a legislação brasileira obriga os partidos a destinar pelo menos 5% do Fundo Partidário anual para incentivar a participação das mulheres na política. Desde 2015, essa lei tem sido aprimorada, exigindo que os recursos fossem geridos por secretarias de mulheres ou institutos liderados pela secretaria. Ainda que o repasse seja obrigatório, os partidos cumprem essa regra apenas parcialmente, no período de 2009 a 2021. A anistia dada pelos partidos a eles próprios, no caso do não cumprimento da lei, é uma forma de subverter as regras formais que buscam incluir mais mulheres na política. Enquanto isso, o papel de formação política acaba sendo ocupado por organizações sociais e think tanks.',
            ]}
            className="mb-28"
          />
        </Container>
      </section>
    </main>
  );
};

export default Atendimento;

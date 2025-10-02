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
          <Container className={'md:w-[900px]'}>
            <div className="text-white text-center mb-16">
              <Heading headingLevel={2} className="font-bold text-[30px] mb-6">
                Fale Conosco e Ajude-nos a Aprimorar o Portal
              </Heading>
              <Text size="B1" className="text-white/90 max-w-2xl mx-auto leading-relaxed">
                O Portal da Classe Política é construído com base na constante colaboração. Seja para
                esclarecer uma dúvida, sugerir uma nova funcionalidade, relatar um problema ou enviar seu
                feedback sobre a ferramenta, sua mensagem é bem-vinda!
              </Text>
            </div>
            <div className="flex flex-wrap items-center justify-evenly gap-2 md:gap-2">
              <div className="w-[160px] h-[160px]">
                <BoxIconText text="Atendimento ReDem" iconType="Headset" />
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
        <Container className="pt-16 pb-16 md:pb-28">
          <div className="text-center mb-12">
            <Heading headingLevel={2} className="mb-4">
              Informações de Contato
            </Heading>
            <Text size="B1" className="text-gray-600 max-w-2xl mx-auto">
              Entre em contato conosco através dos canais disponíveis. Nossa equipe está pronta para atender
              suas necessidades e responder suas dúvidas sobre o Portal da Classe Política.
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <div>
                <Heading headingLevel={3} className="text-xl font-bold mb-6 text-orange">
                  Canais de Atendimento
                </Heading>

                <LineItem className="mb-8">
                  <Text size="B1" className="font-bold mb-3 text-gray-800">
                    E-mail Institucional
                  </Text>
                  <Text className="mb-2">portaldaclassepolitica@gmail.com</Text>
                </LineItem>

                <LineItem className="mb-8">
                  <Text size="B1" className="font-bold mb-3 text-gray-800">
                    Redes Sociais
                  </Text>
                  <div className="flex gap-4 text-orange">
                    <Link
                      target="_blank"
                      href={Constants.links.facebook}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="Facebook" iconSize="2xl" />
                    </Link>
                    <Link
                      target="_blank"
                      href={Constants.links.instagram}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="Instagram" iconSize="2xl" />
                    </Link>
                    <Link
                      target="_blank"
                      href={Constants.links.linkedin}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="LinkedIn" iconSize="2xl" />
                    </Link>
                    <Link
                      target="_blank"
                      href={Constants.links.xTwitter}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="Twitter" iconSize="2xl" />
                    </Link>
                  </div>
                </LineItem>

                <div className="bg-orange/10 p-6 rounded-lg">
                  <Text size="B1" className="font-bold mb-3 text-orange">
                    💡 Dica Importante
                  </Text>
                  <Text size="C1" className="text-gray-700">
                    Você também pode compartilhar suas publicações e trabalhos acadêmicos que fizeram uso dos
                    nossos dados e gráficos. Divulgaremos sua produção científica em nossas páginas!
                  </Text>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Heading headingLevel={3} className="text-xl font-bold mb-4 text-orange">
                Envie sua Mensagem
              </Heading>
              <Text size="C1" className="text-gray-600 mb-6">
                Envie o seu feedback, reporte um erro ou deixe sua sugestão para melhorarmos continuamente o
                Portal da Classe Política.
              </Text>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Input
                  placeholder="Assunto"
                  label="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  maxLength={100}
                />
                <TextArea
                  placeholder="Descreva sua dúvida, sugestão ou problema..."
                  label="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={800}
                />
                <ButtonStyled style="fillOrange" type="submit" className="w-full">
                  Enviar Mensagem
                </ButtonStyled>
              </form>
            </div>
          </div>

          <TextParagraphImage
            link="/news/promo-part"
            src={Constants.images.promoPart}
            header={
              'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
            }
            texts={[
              'Os partidos políticos desempenham um papel crucial na política, controlando recursos importantes como cargos, seleção de candidatos (as) e financiamento. Desde 2009, a legislação brasileira obriga os partidos a destinar pelo menos 5% do Fundo Partidário anual para incentivar a participação das mulheres na política. Desde 2015, essa lei tem sido aprimorada, exigindo que os recursos fossem geridos por secretarias de mulheres ou institutos liderados pela secretaria. Ainda que o repasse seja obrigatório, os partidos cumprem essa regra apenas parcialmente, no período de 2009 a 2021. A anistia dada pelos partidos a eles próprios, no caso do não cumprimento da lei, é uma forma de subverter as regras formais que buscam incluir mais mulheres na política. Enquanto isso, o papel de formação política acaba sendo ocupado por organizações sociais e think tanks.',
            ]}
          />
        </Container>
      </section>
    </main>
  );
};

export default Atendimento;

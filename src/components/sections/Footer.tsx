import Image from 'next/image';

import { Container, Heading, Text } from '@base';
import { BoxIcon } from '@/components/box/BoxIcon';

const sections = [
  {
    title: 'OVERVIEW',
    className: '',
    links: [
      { text: 'Consultas', href: '' },
      { text: 'Projeções', href: '' },
      { text: 'Perfil dos candidatos', href: '' },
      { text: 'Sobre o projeto', href: '' },
      { text: 'Blog', href: '' },
    ],
  },
  {
    title: 'ATENDIMENTO',
    className: '',
    links: [
      { text: 'Cruzamentos e Dados Eleitorais', href: '' },
      { text: 'Indicadores e Índices Especiais', href: '' },
      { text: 'Aprenda a usar os Indicadores', href: '' },
      { text: 'Comunicação Científica', href: '' },
    ],
  },
  {
    title: 'FERRAMENTAS',
    className: '',
    links: [
      { text: 'Suporte Técnico', href: '' },
      { text: 'Falar com Analista', href: '' },
      { text: 'Reportar Erro', href: '' },
      { text: 'Fazer Denúncia', href: '' },
      { text: 'Contato', href: '' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <Container>
        <div className="flex flex-col lg:flex-row py-[90px] gap-10">
          <div className=" lg:max-w-[340px] lg:mr-[160px]">
            <Image src="/img/Logo.svg" alt="Logo" width={154} height={80} />
            <Text className="text-[18px] my-6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma
            </Text>
            <div className="flex gap-4">
              <BoxIcon iconType="Facebook" iconSize={12} className="bg-orange" />
              <BoxIcon iconType="Twitter" iconSize={18} className="bg-orange" />
              <BoxIcon iconType="LinkedIn" iconSize={18} className="bg-orange" />
              <BoxIcon iconType="YouTube" iconSize={18} className="bg-orange" />
            </div>
          </div>

          <div className="flex flex-col gap-10 md:flex-row">
            {sections.map(section => (
              <div key={section.title} className={section.className}>
                <Heading headingLevel={3} size={'H6'} className="font-bold mb-10">
                  {section.title}
                </Heading>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.text}>
                      <Text textType="a" className="text-[18px]">
                        {link.text}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="w-full h-[1px] bg-white"></div>
      <Container>
        <div className="text-center py-7">
          <Text size={'L1'}>
            Copyright © 2024 ARW Consultoria. Todos os direitos reservados. Desenvolvido por Agência WDK
          </Text>
        </div>
      </Container>
    </footer>
  );
};

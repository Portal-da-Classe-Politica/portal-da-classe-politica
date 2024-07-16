import Image from 'next/image';
import Link from 'next/link';

import { Container, Heading, Text } from '@base';
import { BoxIcon } from '@components/box/BoxIcon';
import { routes } from '@routes';

const sections = [
  {
    title: 'OVERVIEW',
    className: '',
    links: [
      { text: 'Consultas', href: routes.consult },
      { text: 'Projeções', href: routes.projections },
      { text: 'Perfil dos candidatos', href: routes.candidates },
      { text: 'Sobre o projeto', href: routes.about },
      { text: 'Blog', href: routes.blog },
    ],
  },
  {
    title: 'ATENDIMENTO',
    className: '',
    links: [
      { text: 'Cruzamentos e Dados Eleitorais', href: routes.support },
      { text: 'Indicadores e Índices Especiais', href: routes.support },
      { text: 'Aprenda a usar os Indicadores', href: routes.support },
      { text: 'Comunicação Científica', href: routes.support },
    ],
  },
  {
    title: 'FERRAMENTAS',
    className: '',
    links: [
      { text: 'Suporte Técnico', href: routes.support },
      { text: 'Reportar Erro', href: routes.support },
      { text: 'Contato', href: routes.support },
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
            <Text className="text-[18px] my-6">Representação e Legitimidade Democrática</Text>
            <div className="flex gap-4">
              <a
                target="_blank"
                href="https://www.facebook.com/people/INCT-ReDem/61552965411509/ "
                className="cursor-pointer"
              >
                <BoxIcon icon="Facebook" iconSize="lg" className="bg-orange" />
              </a>
              <a target="_blank" href="https://x.com/INCT_ReDem " className="cursor-pointer">
                <BoxIcon icon="Twitter" iconSize="lg" className="bg-orange" />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/company/inct-redem-representa%C3%A7%C3%A3o-e-legitimidade-democr%C3%A1tica/"
                className="cursor-pointer"
              >
                <BoxIcon icon="LinkedIn" iconSize="lg" className="bg-orange" />
              </a>
              <a target="_blank" href="https://www.instagram.com/redem.inct/" className="cursor-pointer">
                <BoxIcon icon="Instagram" iconSize="lg" className="bg-orange" />
              </a>
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
                      <Link href={link.href}>
                        <Text className="text-[18px]">{link.text}</Text>
                      </Link>
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

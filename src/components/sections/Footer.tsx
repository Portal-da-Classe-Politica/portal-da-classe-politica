import Image from 'next/image';
import Link from 'next/link';

import { Container, Text } from '@base';
import { BoxIcon } from '@components/box/BoxIcon';
import { routes } from '@routes';
import { Constants } from '@constants';

const sections = [
  {
    title: 'MENU',
    className: '',
    links: [
      { text: 'Cruzamentos', href: routes.consult },
      { text: 'Indices', href: routes.projections },
      { text: 'Perfil dos candidatos', href: routes.candidates },
      { text: 'Sobre o projeto', href: routes.about },
      { text: 'Blog', href: routes.blog },
    ],
  },
  {
    title: 'ATENDIMENTO',
    className: '',
    text: `Tel: +55 (41) 3360-5065
E-mail: inct.redem@gmail.com`,
    links: [{ text: 'Contato', href: routes.support }],
  },
  {
    title: 'FERRAMENTAS',
    className: '',
    links: [
      { text: 'Suporte Técnico', href: routes.support },
      { text: 'Reportar Erro', href: routes.support },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <Container>
        <div className="flex flex-col lg:flex-row py-8 justify-between">
          <div className="lg:max-w-[340px] py-4">
            <Image src="/img/Logo.svg" alt="Logo" width={154} height={80} />
            <Text className="text-4 my-6" size="B2">
              Universidade Federal do Paraná{'\n'}
              Departamento de Ciência Política{'\n'}
              INCT ReDem{'\n'}
              {'\n'}
              Endereço: Rua General{'\n'}
              Carneiro, 460 sala 515 CEP 80060-150 Curitiba, Paraná, Brasil{'\n'}
            </Text>
            <div className="flex gap-4">
              <Link target="_blank" href={Constants.links.facebook}>
                <BoxIcon icon="Facebook" iconSize="lg" className="bg-orange" />
              </Link>
              <Link target="_blank" href={Constants.links.xTwitter}>
                <BoxIcon icon="Twitter" iconSize="lg" className="bg-orange" />
              </Link>
              <Link target="_blank" href={Constants.links.linkedin}>
                <BoxIcon icon="LinkedIn" iconSize="lg" className="bg-orange" />
              </Link>
              <Link target="_blank" href={Constants.links.instagram}>
                <BoxIcon icon="Instagram" iconSize="lg" className="bg-orange" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-10 md:flex-row py-4">
            {sections.map(section => (
              <div key={section.title} className={section.className}>
                <Text size={'B1'} className="font-bold mb-10">
                  {section.title}
                </Text>
                {section.text && (
                  <Text className="text-4 my-6" size="B2">
                    {section.text}
                  </Text>
                )}
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.text}>
                      <Link href={link.href}>
                        <Text className="text-4" size="B2">
                          {link.text}
                        </Text>
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
        <div className="text-center py-4">
          <Text size={'C2'}>
            Copyright © 2024 INCT REDEM. Todos os direitos reservados. Desenvolvido por{' '}
            <Link href={Constants.links.arwPoliticalAdvisory} className="underline underline-offset-1">
              ARW POLITICAL ADVISORY
            </Link>
          </Text>
        </div>
      </Container>
    </footer>
  );
};

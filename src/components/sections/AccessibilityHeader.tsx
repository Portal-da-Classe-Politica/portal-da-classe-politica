import Image from 'next/image';
import Link from 'next/link';

import { Container, Text } from '@base';
import { Constants } from '@constants';

export const AccessibilityHeader = () => {
  return (
    <header className="border-2 border-black border-opacity-5">
      <Container className={'my-[20px]'}>
        <ul className="flex">
          <li>
            <Link href={Constants.links.privacyPolicy} target="__blank">
              <Text size="C2" className="text-grayMix4 mr-4">
                Políticas de Privacidade
              </Text>
            </Link>
          </li>
          <li>
            <Link href={Constants.links.userTerms} target="__blank">
              <Text size="C2" className="text-grayMix4">
                Termos de Uso
              </Text>
            </Link>
          </li>
          <li className=" ml-auto">
            <Image src="/img/Acessibilidade.svg" alt="Acessibilidade" width={200} height={30} />
          </li>
        </ul>
      </Container>
    </header>
  );
};

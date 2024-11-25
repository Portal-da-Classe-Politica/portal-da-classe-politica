import Link from 'next/link';

import { Container, Text } from '@base';
import { Constants } from '@constants';

export const AccessibilityHeader = () => {
  return (
    <header className="border-2 border-black border-opacity-5">
      <Container className={'my-5'}>
        <ul className="flex">
          <li>
            <Link target="_blank" href={Constants.links.privacyPolicy}>
              <Text size="C2" className="text-grayMix4 mr-4">
                Políticas de Privacidade
              </Text>
            </Link>
          </li>
          <li>
            <Link target="_blank" href={Constants.links.userTerms}>
              <Text size="C2" className="text-grayMix4">
                Termos de Uso
              </Text>
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

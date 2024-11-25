import Link from 'next/link';

import { Container, Text } from '@base';

export const AccessibilityHeader = () => {
  return (
    <header className="border-2 border-black border-opacity-5">
      <Container className={'my-5'}>
        <ul className="flex">
          <li>
            <Link target="_blank" href={'/politicas-de-privacidade'}>
              <Text size="C2" className="text-grayMix4 mr-4">
                Políticas de Privacidade
              </Text>
            </Link>
          </li>
          <li>
            <Link target="_blank" href={'/termos-de-uso'}>
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

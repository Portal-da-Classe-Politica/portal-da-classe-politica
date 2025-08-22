import Image from 'next/image';

import { Container, Text } from '@base';

export const AccessibilityHeader = () => {
  return (
    <header className="border-2 border-black border-opacity-5">
      <Container className={'my-5'}>
        <div className="flex justify-between items-center md:justify-between justify-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <Text size="C2" className="text-grayMix4">
              Instituto Nacional de Ciência, Tecnologia e Inovação | Representação e Legitimidade Democrática
              | ReDem
            </Text>
          </div>
          <Image
            src="/img/financiamento/financiamento.png"
            alt="INCT"
            width={333}
            height={25}
            className="h-10 w-auto hidden md:block"
          />
        </div>
      </Container>
    </header>
  );
};

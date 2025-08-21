import Image from 'next/image';

import { Container, Text } from '@base';

export const AccessibilityHeader = () => {
  return (
    <header className="border-2 border-black border-opacity-5">
      <Container className={'my-5'}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Text size="C2" className="text-grayMix4">
              Instituto Nacional de Ciência, Tecnologia e Inovação | Representação e Legitimidade Democrática
              | ReDem
            </Text>
          </div>
          <div className="flex items-center gap-4 ml-8">
            <Image
              src="/img/financiamento/inct.jpg"
              alt="INCT"
              width={80}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/img/financiamento/cnpq.png"
              alt="CNPq"
              width={80}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/img/financiamento/araucaria.png"
              alt="Fundação Araucária"
              width={80}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

import Image from 'next/image';

import { Container } from '@base';

export const AccessibilityHeader = () => {
  return (
    <header className="border-2 border-black border-opacity-5">
      <Container className={'my-[20px]'}>
        <ul className="flex">
          <li>
            <a className="font-montserrat text-xs mr-4">Políticas de Privacidade</a>
          </li>
          <li>
            <a className="font-montserrat text-xs ">Termos de Uso</a>
          </li>
          <li className=" ml-auto">
            <Image src="/img/Acessibilidade.svg" alt="Acessibilidade" width={200} height={30} />
          </li>
        </ul>
      </Container>
    </header>
  );
};

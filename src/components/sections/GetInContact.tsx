import { Container, Heading } from '@base';
import { BoxIconText } from '@components/box/BoxIconText';
import { routes } from '@routes';
import Link from 'next/link';

export const GetInContact = () => {
  return (
    <section className="bg-orange py-[80px]">
      <Container className={'md:w-[770px]'}>
        <div className="text-white text-center mb-11">
          <Heading headingLevel={2} className="font-bold text-[30px] mb-[22px]">
            Entre em contato com a equipe do Portal Redem
          </Heading>{' '}
        </div>
        <div className="flex flex-wrap items-center  justify-evenly  gap-4 md:gap-4">
          <div className="w-[160px] h-[160px]">
            <Link href={routes.support}>
              <BoxIconText text="Atendimento Redem" iconType="Headset" />
            </Link>
          </div>
          <div className="w-[160px] h-[160px]">
            <Link href={routes.support}>
              <BoxIconText text="Reportar Erro" iconType="Error" />
            </Link>
          </div>
          <div className="w-[160px] h-[160px]">
            <Link href={routes.support}>
              <BoxIconText text="Elogios ao projeto" iconType="Star" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

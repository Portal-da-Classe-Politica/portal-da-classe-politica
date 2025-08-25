import { Container, Heading, Text } from '@base';
import { routes } from '@routes';
import Link from 'next/link';

const boxes = ['Atendimento ReDem'];

const boxClass =
  'flex flex-col w-[150px] h-[150px] flex-1 aspect-square bg-white py-5 px-7 rounded-[10px] justify-center items-center text-center text-orange';

export const GetInContact = () => {
  return (
    <section className="bg-orange py-20">
      <Container className={'md:w-[770px]'}>
        <div className="text-white text-center mb-11">
          <Heading headingLevel={2} className="font-bold !text-7 mb-5">
            Entre em contato com a equipe do Portal ReDem
          </Heading>
        </div>
        <div className="flex flex-wrap items-center  justify-evenly  gap-4 md:gap-4">
          {boxes.map(text => (
            <div key={text} className="w-[160px] h-[160px]">
              <Link target="_blank" href={routes.support}>
                <div className={boxClass}>
                  <Text size={'B1'} className="font-bold text-orange">
                    {text}
                  </Text>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

'use client';

import { CarouselTabs } from '../CarouselTabs';
import { Container, ButtonStyled, Heading, Text } from '../base';

export const HowToCrossing = ({ className }: { className?: string }) => {
  const tabs = [
    {
      title: 'Como fazer os cruzamentos',
      content: (
        <>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="  text-white">
              <Heading headingLevel={2} className="font-bold pb-3 text-h5 md:text-h1">
                Como fazer os cruzamentos
              </Heading>
              <Text className=" text-[18px] font-bold pb-[20px]">
                Como fazer os cruzamentosComo fazer os cruzamentos
              </Text>
              <Text size={'B2'} className="mt-auto pb-[20px] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa
                lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis ec.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis
                scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum.
                Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum.
              </Text>
              <ButtonStyled style="fillBlack">
                <Text className="text-[14px] font-bold">Saiba mais</Text>
              </ButtonStyled>
            </div>
            <div>
              <div className="w-[320px] md:h-[300px] md:w-[533px] bg-orangeLight1 rounded-lg"></div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Como fazer os cruzamentos',
      content: (
        <>
          <div className="flex flex-col md:flex-row">
            <div className="  text-white">
              <Heading headingLevel={2} className="font-bold pb-3">
                Como fazer os cruzamentos
              </Heading>
              <Text className=" text-[18px font-bold pb-[20px]">
                Como fazer os cruzamentosComo fazer os cruzamentos
              </Text>
              <Text size={'B2'} className="mt-auto pb-[20px] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa
                lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis ec.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa lobortis
                scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate ipsum.
                Suspendisse non odio sit amet massa lobortis scelerisque. Integer gravida nulla ipsum.
              </Text>
            </div>
            <div>
              <div className="w-[320px] md:h-[300px] md:w-[533px] bg-orangeLight1 rounded-lg"></div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <section className={className}>
      <Container>
        <CarouselTabs tabs={tabs.map(t => t.title)} contents={tabs.map(t => t.content)} />
      </Container>
    </section>
  );
};

import { Container, Heading, Text } from '@base';
import { BoxIconText } from '@/components/box/BoxIconText';

export const GetInContact = () => {
  return (
    <section className="bg-orange py-[80px]">
      <Container className={'w-[770px]'}>
        <div className="text-white text-center mb-11">
          <Heading headingLevel={2} className="font-bold text-[30px] mb-[22px]">
            Entre em contato com a equipe do Portal Redem
          </Heading>{' '}
          <Text className="text-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non odio sit amet massa
            lobortis scelerisque. Integer gravida nulla ipsum, in convallis nisi mollis nec. Nam vulputate
            ipsum.
          </Text>
        </div>
        <div className="flex justify-between gap-8">
          <BoxIconText text="Canal de denúncia" iconType="Megafone" />
          <BoxIconText text="Atendimento Redem" iconType="Headset" />
          <BoxIconText text="Reportar Erro" iconType="Error" />
          <BoxIconText text="Elogios ao projeto" iconType="Star" />
        </div>
      </Container>
    </section>
  );
};

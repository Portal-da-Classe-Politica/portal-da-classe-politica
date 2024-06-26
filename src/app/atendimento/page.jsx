import { Header } from '@/components/Header';
import LineItem from '@/components/LineItem';
import { ButtonStyled, Container, Heading, Text } from '@/components/base';
import { BoxIconText } from '@/components/box/BoxIconText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Input from '@/components/base/input/Input';
import TextArea from '@/components/base/input/TextArea';
import ImageText from '@/components/ImageText';

const Atendimento = () => {
  return (
    <main>
      <section className="bg-orange pt-[15px]">
        <Container>
          <Header style="light" />
        </Container>
      </section>
      <section className="bg-orange py-[80px]">
        <Container className={'w-[770px]'}>
          <div className="text-white text-center mb-11">
            <Text textType="span" size="S1" className="font-bold text-[30px] mb-[22px]">
              ATENDIMENTO
            </Text>{' '}
            <Heading headingLevel={2} className="font-bold text-[30px] mb-[22px]">
              Precisando de ajuda? Escolha o método de atendimento
            </Heading>{' '}
          </div>
          <div className="flex justify-between gap-8">
            <BoxIconText text="Canal de denúncia" iconType="Megafone" />
            <BoxIconText text="Atendimento Redem" iconType="Headset" />
            <BoxIconText text="Reportar Erro" iconType="Error" />
            <BoxIconText text="Elogios ao projeto" iconType="Star" />
          </div>
        </Container>
      </section>
      <section className="bg-[#F4F4F4]">
        <Container className="pt-10 pb-[150px]">
          <Heading headingLevel={2}>Informações de Contato</Heading>
          <div className="flex mb-[140px]">
            <div className="flex-1">
              <LineItem className="my-7">
                <Text textType="h2" size="B1" className="font-bold mb-2">
                  Telefone
                </Text>
                <Text>+55 (41) 3234-1241</Text>
              </LineItem>
              <LineItem className="mb-7">
                <Text textType="h2" size="B1" className="font-bold mb-2">
                  WhatsApp
                </Text>
                <Text>+55 (41) 98234-1241</Text>
              </LineItem>
              <LineItem className="mb-7">
                <Text textType="h2" size="B1" className="font-bold mb-2">
                  E-mail
                </Text>
                <Text>contato@rwbincorporadora.com.br</Text>
              </LineItem>
              <LineItem className="mb-7">
                <Text textType="h2" size="B1" className="font-bold mb-2">
                  Endereço
                </Text>
                <Text>Rua João José Massaneiro, 1377</Text>
                <Text>Centro - São José dos Pinhais</Text>
              </LineItem>
              <LineItem>
                <Text textType="h2" size="B1" className="font-bold mb-2">
                  Redes Sociais
                </Text>
                <div className="flex justify-between text-orange">
                  <Text textType="a">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </Text>
                  <Text textType="a">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </Text>
                  <Text textType="a">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                  </Text>
                </div>
              </LineItem>
            </div>
            <div className="flex-1">
              <Text textType="h2" size="S1" className="font-bold">
                Informações de Contato
              </Text>
              <form className="flex flex-col gap-7 mt-6 mb-9">
                <div className="flex gap-5">
                  <Input placeholder="Nome Completo" label="name" />
                  <Input placeholder="Email" label="email" />
                </div>
                <div className="flex gap-5">
                  <Input placeholder="Celular (DDD + telefone)" label="phone" />
                  <Input placeholder="Assunto" label="topic" />
                </div>
                <div>
                  <TextArea placeholder="Mensagem" label="message" />
                </div>
              </form>
              <ButtonStyled style="fillOrange">Enviar </ButtonStyled>
            </div>
          </div>
          <ImageText />
        </Container>
      </section>
    </main>
  );
};

export default Atendimento;

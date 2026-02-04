import { ButtonStyled, Container, Heading, Text, Input, TextArea, TextParagraphImage } from '@base';
import { Header } from '@components/sections/Header';
import { LineItem } from '@components/LineItem';
import { BoxIconText } from '@components/box/BoxIconText';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { Constants } from '@constants';
import { EmailBodyData } from '@services/contact/sendEmail';
import Link from 'next/link';
import { BoxIcon } from '@components/box/BoxIcon';
import { WordPressBlogService } from '@services/blog/WordPressBlogService';
import dynamicImport from 'next/dynamic';

// Force dynamic rendering to avoid build-time WordPress API calls
export const dynamic = 'force-dynamic';

const ContactForm = dynamicImport(() => import('../../components/sections/ContactForm'));

const Atendimento = async () => {
  // Buscar último post do WordPress
  let latestPost;
  try {
    const posts = await WordPressBlogService.getAllFormatted();
    latestPost = posts[0]; // Pega o post mais recente
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    // Continue rendering without posts
  }

  return (
    <main>
      <div className="relative">
        <section className="bg-orange pt-[15px] ">
          <DesignSemiCircle />

          <Container>
            <Header style="light" />
          </Container>
        </section>
        <section className="bg-orange py-20">
          <Container className={'md:w-[900px]'}>
            <div className="text-white text-center mb-16">
              <Heading headingLevel={2} className="font-bold text-[30px] mb-6">
                Fale Conosco e Ajude-nos a Aprimorar o Portal
              </Heading>
              <Text size="B1" className="text-white/90 max-w-2xl mx-auto leading-relaxed">
                O Portal da Classe Política é construído com base na constante colaboração. Seja para
                esclarecer uma dúvida, sugerir uma nova funcionalidade, relatar um problema ou enviar seu
                feedback sobre a ferramenta, sua mensagem é bem-vinda!
              </Text>
            </div>
            <div className="flex flex-wrap items-center justify-evenly gap-2 md:gap-2">
              <div className="w-[160px] h-[160px]">
                <BoxIconText text="Atendimento ReDem" iconType="Headset" />
              </div>
              <div className="w-[160px] h-[160px]">
                <BoxIconText text="Reportar Erro" iconType="Error" />
              </div>
              <div className="w-[160px] h-[160px]">
                <BoxIconText text="Elogios ao projeto" iconType="Star" />
              </div>
            </div>
          </Container>
        </section>
      </div>
      <section className="bg-[#F4F4F4]">
        <Container className="pt-16 pb-16 md:pb-28">
          <div className="text-center mb-12">
            <Heading headingLevel={2} className="mb-4">
              Informações de Contato
            </Heading>
            <Text size="B1" className="text-gray-600 max-w-2xl mx-auto">
              Entre em contato conosco através dos canais disponíveis. Nossa equipe está pronta para atender
              suas necessidades e responder suas dúvidas sobre o Portal da Classe Política.
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <div>
                <Heading headingLevel={3} className="text-xl font-bold mb-6 text-orange">
                  Canais de Atendimento
                </Heading>

                <LineItem className="mb-8">
                  <Text size="B1" className="font-bold mb-3 text-gray-800">
                    E-mail Institucional
                  </Text>
                  <Text className="mb-2">portaldaclassepolitica@gmail.com</Text>
                </LineItem>

                <LineItem className="mb-8">
                  <Text size="B1" className="font-bold mb-3 text-gray-800">
                    Redes Sociais
                  </Text>
                  <div className="flex gap-4 text-orange">
                    <Link
                      target="_blank"
                      href={Constants.links.facebook}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="Facebook" iconSize="2xl" />
                    </Link>
                    <Link
                      target="_blank"
                      href={Constants.links.instagram}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="Instagram" iconSize="2xl" />
                    </Link>
                    <Link
                      target="_blank"
                      href={Constants.links.linkedin}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="LinkedIn" iconSize="2xl" />
                    </Link>
                    <Link
                      target="_blank"
                      href={Constants.links.xTwitter}
                      className="hover:scale-110 transition-transform"
                    >
                      <BoxIcon icon="Twitter" iconSize="2xl" />
                    </Link>
                  </div>
                </LineItem>

                <div className="bg-orange/10 p-6 rounded-lg">
                  <Text size="B1" className="font-bold mb-3 text-orange">
                    💡 Dica Importante
                  </Text>
                  <Text size="C1" className="text-gray-700">
                    Você também pode compartilhar suas publicações e trabalhos acadêmicos que fizeram uso dos
                    nossos dados e gráficos. Divulgaremos sua produção científica em nossas páginas!
                  </Text>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Heading headingLevel={3} className="text-xl font-bold mb-4 text-orange">
                Envie sua Mensagem
              </Heading>
              <Text size="C1" className="text-gray-600 mb-6">
                Envie o seu feedback, reporte um erro ou deixe sua sugestão para melhorarmos continuamente o
                Portal da Classe Política.
              </Text>

              <ContactForm />
            </div>
          </div>

          {latestPost && (
            <TextParagraphImage
              link={latestPost.link}
              src={latestPost.img}
              header={latestPost.title}
              texts={[latestPost.description]}
            />
          )}
        </Container>
      </section>
    </main>
  );
};

export default Atendimento;

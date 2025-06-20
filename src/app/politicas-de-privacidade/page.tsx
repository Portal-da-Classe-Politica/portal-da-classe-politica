import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';

const sections = [
  {
    title: '1. Bem-vindo ao Portal da Classe Política',
    text: 'Nossa prioridade é garantir a privacidade e a segurança dos dados que apresentamos e utilizamos. Esta política de privacidade descreve como tratamos as informações coletadas e usadas em nosso site.',
  },
  {
    title: '2. Coleta de Dados',
    text: 'Nosso Portal não coleta dados pessoais de nossos visitantes. Todo o conteúdo apresentado é baseado em dados públicos fornecidos pelo Tribunal Superior Eleitoral (TSE) e outras fontes públicas. Não solicitamos, armazenamos e processamos informações pessoais de nossos usuários.',
  },
  {
    title: '3. Uso de Dados',
    text: 'Os dados exibidos em nosso Portal são exclusivamente dados públicos obtidos de fontes confiáveis, como o TSE. Utilizamos essas informações para fornecer análises e insights políticos, respeitando todas as regulamentações e diretrizes de privacidade aplicáveis.',
  },
  {
    title: '4. Cookies',
    text: 'Nosso site utiliza cookies apenas para melhorar a experiência do usuário, como lembrar preferências de idioma ou layout. Não utilizamos cookies para rastrear atividades dos usuários fora do nosso Portal, nem para coletar dados pessoais.',
  },
  {
    title: '5. Compartilhamento de Dados',
    text: 'Não compartilhamos, vendemos ou transferimos dados pessoais de usuários, pois não os coletamos.. Os dados públicos apresentados são utilizados apenas para fins informativos e analíticos.',
  },
  {
    title: '6. Segurança',
    text: 'Implementamos medidas de segurança para proteger as informações em nosso site contra mal feitos, alterações, divulgação ou destruição indevidas. Embora nos esforcemos para proteger nossos sistemas e informações, lembre-se de que nenhum método de transmissão pela internet ou método de armazenamento eletrônico é 100% seguro.',
  },
  {
    title: '7. Alterações nesta Política de Privacidade',
    text: 'Podemos atualizar nossa política de privacidade periodicamente. Notificaremos qualquer alteração publicando a nova política de privacidade em nosso site. Recomenda-se revisar esta política periodicamente para quaisquer mudanças.',
  },
  {
    title: '8. Contato',
    text: 'Se tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco através do nosso e-mail de suporte: portaldaclassepolitica@gmail.com',
  },
];

const Page = () => {
  return (
    <main className="font-montserrat bg-grayMix3">
      <section className="pb-8 pt-4">
        <Container>
          <Header style="dark" />
        </Container>
      </section>

      <section className="mt-8 mb-16">
        <Container>
          <Heading>Política de Privacidade</Heading>

          <div className="mt-8">
            {sections.map(({ title, text }) => (
              <div key={title}>
                <Text size="B1" className="mt-4 font-bold">
                  {title}
                </Text>
                <Text size="B1" className="mt-2">
                  {text}
                </Text>
              </div>
            ))}
            <Text size="C1" className="mt-6 underline">
              Data de Vigência: Janeiro de 2028
            </Text>
          </div>
        </Container>
      </section>

      <GetInContact />
    </main>
  );
};

export default Page;

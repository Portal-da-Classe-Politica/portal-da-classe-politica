import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';

const termsSections = [
  {
    title: '1. Uso do Portal',
    text: 'Nosso Potal oferece uma série de visualizações gráficas que podem ser personalizadas conforme as variáveis escolhidas pelo usuário. Os dados utilizados são provenientes de bancos de dados públicos, principalmente do Tribunal Superior Eleitoral (TSE).',
  },
  {
    title: '2. Propriedade Intelectual',
    text: 'Todo o conteúdo, como textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é propriedade do Portal ou de nossos fornecedores de conteúdo e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.',
  },
  {
    title: '3. Limitação de Responsabilidade',
    text: 'Embora nos esforcemos para garantir a precisão e atualidade das informações apresentadas, não podemos garantir que o conteúdo do Portal esteja livre de erros ou omissões. O uso das informações e gráficos fornecidos é de inteira responsabilidade do usuário. Em nenhum caso seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, consequenciais ou especiais decorrentes do uso ou incapacidade de uso do Portal por terceiros.',
  },
  {
    title: '6. Modificações nos Termos de Uso',
    text: 'Podemos revisar estes termos de uso a qualquer momento sem aviso prévio. Ao utilizar o Portal, você concorda em estar vinculado à versão atual destes termos.',
  },
  {
    title: '7. Uso Aceitável',
    text: 'Você concorda em usar o Portal somente para fins lícitos e de uma maneira que não infrinja o direito, restrinja ou iniba seu uso e aproveitamento do por terceiros.',
  },
  {
    title: '8. Dados Públicos e Transparência',
    text: 'Os dados utilizados em nosso Portal são exclusivamente dados públicos fornecidos pelo TSE e outras fontes públicas confiáveis. Utilizamos essas informações para fornecer análises e visualizações, respeitando todas as regulamentações e diretrizes de privacidade aplicáveis.',
  },
  {
    title: '9. Privacidade',
    text: 'Nosso portal não coleta dados pessoais de nossos usuários. Para mais detalhes, consulte nossa Política de Privacidade.',
  },
  {
    title: '10. Lei Aplicável',
    text: 'Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil.',
  },
  {
    title: '11. Contato',
    text: 'Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através do nosso e-mail de suporte: portaldaclassepolitica@gmail.com',
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
          <Heading>Termos de Uso</Heading>

          <div className="mt-8">
            <Text size="B1" className="mt-8">
              Bem-vindo ao Portal da Classe Política. Ao acessar e utilizá-lovocê concorda em cumprir e estar
              vinculado aos seguintes termos de uso.
            </Text>
            {termsSections.map(({ title, text }) => (
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

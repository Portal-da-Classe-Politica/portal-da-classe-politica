import { CardPost } from '@components/CardPost';

const Example = () => {
  return (
    <div>
      <div className="m-10 h-[500px] w-[600px]">
        <CardPost
          href=""
          alt={'Lorem ipsum dolor sit amet sectetur dolor sit'}
          category={['Leitura de 3min', 'Categoria Aqui']}
          customHeight={90}
          subTitle={
            'Antes de votar, confira o material informativo que preparamos com tudo que você precisa saber sobre suas opções de voto para prefeito e vereadores da sua cidade.'
          }
          title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
          src={'/img/Dados2.svg'}
          type="Primary"
        />
      </div>
      <div className="m-10 h-[500px] w-[600px]">
        <CardPost
          href=""
          alt={'Lorem ipsum dolor sit amet sectetur dolor sit'}
          category={['Leitura de 3min', 'Categoria Aqui']}
          customHeight={90}
          subTitle={
            'Antes de votar, confira o material informativo que preparamos com tudo que você precisa saber sobre suas opções de voto para prefeito e vereadores da sua cidade.'
          }
          title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
          src={'/img/Dados2.svg'}
          type="Secondary"
        />
      </div>
      <div className="m-10 h-[500px] w-[600px]">
        <CardPost
          href=""
          alt={'Lorem ipsum dolor sit amet sectetur dolor sit'}
          category={['Leitura de 3min', 'Categoria Aqui']}
          customHeight={90}
          subTitle={
            'Antes de votar, confira o material informativo que preparamos com tudo que você precisa saber sobre suas opções de voto para prefeito e vereadores da sua cidade.'
          }
          title={'Eleições 2024: Conheça o histórico dos candidatos da sua cidade'}
          src={'/img/Dados2.svg'}
          type="Tertiary"
        />
      </div>
    </div>
  );
};

export default Example;

import { Constants } from '@constants';

import { CardPost } from '@components/CardPost';
import { CarouselView } from '@components/carousel/CarouselView';

export const Carousel = () => {
  return (
    <CarouselView>
      <div className="h-[370px] md:h-[480px]">
        <CardPost
          alt={'Eleição 2024: A Persistente Sub-Representação de Mulheres na Política'}
          category={['Leitura de 5min']}
          customHeight={270}
          title={'Eleição 2024: A Persistente Sub-Representação de Mulheres na Política'}
          subTitle={
            'Partidos controlam recursos políticos vitais e desde 2009, devem investir 5% do Fundo Partidário anual para fomentar a participação feminina na política.'
          }
          src={Constants.images.reputacaoMulher}
          type="Primary"
          href="/blog/reputacao-mulher"
        />
      </div>
      <div className="h-[370px] md:h-[480px]">
        <CardPost
          alt={
            'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
          }
          type="Primary"
          category={['Leitura de 5min']}
          customHeight={270}
          subTitle={'Os partidos políticos controlam os principais recursos presentes hoje na política'}
          title={
            'A promoção da participação política das mulheres parcialmente realizada pelos partidos políticos'
          }
          src={Constants.images.promoPart}
          href="/blog/promo-part"
        />
      </div>
      <div className="h-[370px] md:h-[480px]">
        <CardPost
          alt={
            'A participação feminina na liderança partidária e o cumprimento das cotas financeiras para mulheres '
          }
          type="Primary"
          category={['Leitura de 5min']}
          customHeight={270}
          title={
            'A participação feminina na liderança partidária e o cumprimento das cotas financeiras para mulheres '
          }
          subTitle=" A persistente sub-representação feminina na política é uma questão de grande relevância e
                complexidade"
          src={Constants.images.partFemLid}
          href="/blog/part-fem-lid"
        />
      </div>
    </CarouselView>
  );
};

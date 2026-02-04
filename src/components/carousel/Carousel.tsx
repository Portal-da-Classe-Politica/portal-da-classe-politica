import { WordPressBlogService } from '@services/blog/WordPressBlogService';
import { FormattedBlogPost } from '@services/blog/WordPressTypes';
import { CarouselView } from '@components/carousel/CarouselView';
import { CarouselItem } from './CarouselItem';

/**
 * Dynamic Carousel Component
 * Fetches featured blog posts from WordPress API
 *
 * TODO: Old implementation used static hardcoded posts
 * Now dynamically fetches latest posts from WordPress for better content management
 */
export const Carousel = async () => {
  // Fetch latest posts from WordPress (limit to 3 for carousel)
  let featuredPosts: FormattedBlogPost[] = [];
  try {
    const allPosts = await WordPressBlogService.getAllFormatted();
    featuredPosts = allPosts.slice(0, 3); // Get first 3 posts for carousel
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    // Continue rendering without posts
  }

  // Fallback if no posts are available
  if (!featuredPosts || featuredPosts.length === 0) {
    return null;
  }

  return (
    <CarouselView>
      {featuredPosts.map((post, index) => (
        <div key={post.id} className="h-[370px] md:h-[480px]">
          <CarouselItem
            className="rounded-b-[0px]"
            alt={post.title}
            category={post.categories.length > 0 ? post.categories : ['Blog']}
            customHeight={270}
            title={post.title}
            subTitle={post.description}
            src={post.img}
            type="Primary"
            href={post.link}
          />
        </div>
      ))}
    </CarouselView>
  );
};

// TODO: Old static implementation - discontinued
// The carousel below used hardcoded posts with static images and text
// Now uses WordPress API to fetch latest posts dynamically
/*
export const Carousel = () => {
  return (
    <CarouselView>
      <div className="h-[370px] md:h-[480px]">
        <CarouselItem
          className="rounded-b-[0px]"
          alt={'Eleição 2024: A Persistente Sub-Representação de Mulheres na Política'}
          category={['Leitura de 5min']}
          customHeight={270}
          title={'Eleição 2024: A Persistente Sub-Representação de Mulheres na Política'}
          subTitle={
            'Partidos controlam recursos políticos vitais e desde 2009, devem investir 5% do Fundo Partidário anual para fomentar a participação feminina na política.'
          }
          src={Constants.images.reputacaoMulher}
          type="Primary"
          href="https://redem.c3sl.ufpr.br/blog/?p=158"
        />
      </div>
      <div className="h-[370px] md:h-[480px]">
        <CarouselItem
          className="rounded-b-[0px]"
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
          href="https://redem.c3sl.ufpr.br/blog/?p=163"
        />
      </div>
      <div className="h-[370px] md:h-[480px]">
        <CarouselItem
          className="rounded-b-[0px]"
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
          href="https://redem.c3sl.ufpr.br/blog/?p=168"
        />
      </div>
    </CarouselView>
  );
};
*/

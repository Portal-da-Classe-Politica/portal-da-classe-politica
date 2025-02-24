import { Container } from '@base';
import { Header } from '@components/sections/Header';

import { GetInContact } from '@components/sections/GetInContact';

import { CandidateService } from '@services/candidates/CandidateService';
import { SearchSection } from './components/SearchSection';

const Page = async () => {
  const filters = await CandidateService.getFilters();

  return (
    <main className="font-montserrat bg-orange">
      <section className="pt-4 ">
        <Container>
          <Header style="light" />
        </Container>
      </section>

      <SearchSection title="Procure seu candidato" filters={filters} />

      <GetInContact />
    </main>
  );
};

export default Page;

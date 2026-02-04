'use client';

import { Container, Heading, Text } from '@base';
import { Header } from '@components/sections/Header';
import { GetInContact } from '@components/sections/GetInContact';
import { DesignSemiCircle } from '@components/design/DesignSemiCircle';
import { TeamMemberCard } from '@components/team/TeamMemberCard';
import { coordenacao, desenvolvedores, membrosEquipe } from '../../data/team';

const EquipePage = () => {
  return (
    <main className="font-montserrat">
      {/* Header Section */}
      <section className="bg-orange pb-10 md:pb-20 pt-4 relative overflow-hidden">
        <DesignSemiCircle position="top" />
        <Container>
          <Header style="light" />
          <div className="text-center text-white mt-10 md:mt-16">
            <Heading headingLevel={1} size="D1" className="text-h2 md:text-d1 mb-4">
              Equipe
            </Heading>
            <Text size="S1" className="text-h6 md:text-s1 max-w-2xl mx-auto">
              O Portal da Classe Política contou com uma equipe multidisciplinar, com pesquisadores, técnicos
              e docentes
            </Text>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <Container>
          {/* Coordenação */}
          <div className="mb-16">
            <Heading headingLevel={2} size="H2" className="text-h3 md:text-h2 mb-8 font-bold">
              Coordenação
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coordenacao.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* Desenvolvedores */}
          <div className="mb-16">
            <Heading headingLevel={2} size="H2" className="text-h3 md:text-h2 mb-8 font-bold">
              Desenvolvedores
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {desenvolvedores.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* Revisores */}
          <div className="mb-16">
            <Heading headingLevel={2} size="H2" className="text-h3 md:text-h2 mb-8 font-bold">
              Revisores
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membrosEquipe.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <GetInContact />
    </main>
  );
};

export default EquipePage;

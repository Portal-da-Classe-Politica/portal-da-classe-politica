import Image from 'next/image';
import { Heading, Text } from '../base';
import { Divider } from '../Divider';
import { BoxIcon } from '../box/BoxIcon';
import TextBetween from '../base/text/TextBetween';
import { cleanString } from '@utils';
import { ChipContainer } from '@components/ChipContainer';

type CandidateProfileProps = {
  src: string;
  candidate: any;
};

const CandidateProfile = ({ src, candidate }: CandidateProfileProps) => {
  const parseCoalitions = (coalitions: string | undefined) => {
    return coalitions ? coalitions.split('/').map(cleanString) : [];
  };

  const coalitions = parseCoalitions(candidate?.coligacao);
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className=" w-[190px] relative h-[240px] ">
        <Image src={src} fill className="rounded-lg object-cover h-auto w-auto" alt="" />
      </div>
      <div>
        <Text textType="span" size="L2" className="text-orange font-bold">
          {candidate.nome_atual}
        </Text>
        <Heading headingLevel={2} size="H4" className="font-bold mb-2">
          {candidate.nome}
        </Heading>
        <Divider type="orange" bottom="small" />
        <div className="mb-3 flex flex-col gap-2">
          <TextBetween text={candidate.ultimo_cargo} title="Cargo" />
          <TextBetween text={candidate.ultima_unidade_eleitoral} title="Estado" />
          <TextBetween text={candidate.ultima_situacao_candidatura} title="Situação" />
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex gap-4">
            <BoxIcon
              icon="Instagram"
              size={9}
              iconSize="lg"
              className="bg-white border-orange border-[1px] text-orange rounded-md"
            />
            <BoxIcon
              icon="Twitter"
              size={9}
              iconSize="lg"
              className="bg-white border-orange border-[1px] text-orange rounded-md"
            />
            <BoxIcon
              icon="Facebook"
              size={9}
              iconSize="lg"
              className="bg-white border-orange border-[1px] text-orange rounded-md"
            />
          </div>
        </div>
        <div>
          <Text size="B1" className="mb-2 font-bold mt-2">
            Coligações
          </Text>
          <div className="flex flex-wrap mt-2 gap-2 mb-2">
            {coalitions.map(coalition => (
              <ChipContainer
                key={coalition}
                type={
                  candidate?.nome_atual === coalition || candidate?.sigla_partido === coalition
                    ? 'full'
                    : 'ghost'
                }
                className="!mr-0"
              >
                {coalition}
              </ChipContainer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;

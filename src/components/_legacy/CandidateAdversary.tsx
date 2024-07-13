import Image from 'next/image';
import { Text } from '../base';

type CandidateAdversaryProps = {
  src: string;
  political: string;
  name: string;
  vice: string;
};

const CandidateAdversary = ({ src, political, name, vice }: CandidateAdversaryProps) => {
  return (
    <div className="flex gap-10">
      <div className=" w-[70px] relative h-90px] ">
        <Image src={src} fill className="rounded-lg object-cover h-auto w-auto" alt="" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1 mb-5">
          <Text size="C2" className="font-bold text-orange">
            {political}
          </Text>
          <Text size="C1" className="font-bold">
            {name}
          </Text>
          <Text size="C2">
            <span className="font-bold mr-1">Vice:</span>
            {vice}
          </Text>
        </div>
        <Text textType="a" size="C2" className="underline text-orange">
          Ver perfil candidato
        </Text>
      </div>
    </div>
  );
};

export default CandidateAdversary;

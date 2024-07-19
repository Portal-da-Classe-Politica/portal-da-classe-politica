import { Divider } from '../Divider';
import { Heading, Text } from '../base';

const LastElection = () => {
  return (
    <div className="shadow-[0px_5px_5px_0px_#00000024] rounded-lg p-5 bg-grayMix3 w-full">
      <Heading headingLevel={2} size="H4" className="font-bold">
        Eleicoes 2024
      </Heading>
      <Divider type="orange" bottom="small" />
      <div>
        <Text size="C2" className="font-bold mb-3">
          PESQUISA ELEITORAL TSE
        </Text>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex">
            <div className="w-[40%]">
              <Text size="C2" className="font-bold text-grayMix4">
                Professora Angela
              </Text>
              <Text size="C2" className="font-bold text-orange">
                PSOL
              </Text>
            </div>
            <div className="w-[60%]  text-right content-center font-bold text-white flex justify-end">
              <div className="bg-orange rounded-full py-0.5 pr-1.5" style={{ width: `calc(1% + 28px)` }}>
                <Text textType="span" size="C2">
                  1%
                </Text>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-[40%]">
              <Text size="C2" className="font-bold text-grayMix4">
                Professora Angela
              </Text>
              <Text size="C2" className="font-bold text-orange">
                PSOL
              </Text>
            </div>
            <div className="w-[60%]  text-right content-center font-bold text-white flex justify-end">
              <div className="bg-orange rounded-full py-0.5 pr-1.5" style={{ width: `calc(1% + 28px)` }}>
                <Text textType="span" size="C2">
                  1%
                </Text>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-[40%]">
              <Text size="C2" className="font-bold text-grayMix4">
                Professora Angela
              </Text>
              <Text size="C2" className="font-bold text-orange">
                PSOL
              </Text>
            </div>
            <div className="w-[60%]  text-right content-center font-bold text-white flex justify-end">
              <div className="bg-orange rounded-full py-0.5 pr-1.5" style={{ width: `calc(1% + 28px)` }}>
                <Text textType="span" size="C2">
                  1%
                </Text>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-[40%]">
              <Text size="C2" className="font-bold text-grayMix4">
                Professora Angela
              </Text>
              <Text size="C2" className="font-bold text-orange">
                PSOL
              </Text>
            </div>
            <div className="w-[60%]  text-right content-center font-bold text-white flex justify-end">
              <div className="bg-orange rounded-full py-0.5 pr-1.5" style={{ width: `calc(1% + 28px)` }}>
                <Text textType="span" size="C2">
                  1%
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastElection;

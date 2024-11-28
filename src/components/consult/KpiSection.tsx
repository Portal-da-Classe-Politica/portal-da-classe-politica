import { Text } from '@base/text';
import { Heading } from '@base/Heading';

export const KpiSection = ({ data }: { data: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <Heading headingLevel={2} size="H1" className="font-bold">
        {data.title}
      </Heading>

      <div className="flex flex-col md:flex-row justify-between flex-wrap">
        {data.extraData.map((singleData: any, index: number) => {
          return (
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:w-[50%] p-2" key={`kpi-${index}`}>
              <div className="flex-1">
                <Heading headingLevel={2} size="H1" className="font-bold text-orange">
                  {singleData.value}
                </Heading>
                <Heading headingLevel={2} size="H6" className="font-bold">
                  {singleData.label}
                </Heading>
              </div>
              <div className="flex-1">
                <Text className="mx-4">{singleData.description}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { Text } from '../base';

type CandidateFinanceProps = {
  name: string;
  city: string;
  date: string;
  value: string;
};

const CandidateFinance = ({ name, city, date, value }: CandidateFinanceProps) => {
  return (
    <div className="flex gap-1 justify-between">
      <div>
        <Text size="C1" className="font-bold">
          {name}
        </Text>
        <Text className="text-[10px] text-orange">Origem: {city}</Text>
      </div>
      <div className="text-right">
        <Text className="text-orange font-bold text-[10px]">{value}</Text>
        <Text className="text-[10px]">Data da doação: {date}</Text>
      </div>
    </div>
  );
};

export default CandidateFinance;

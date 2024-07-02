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
        <Text size="MIN" className=" text-orange">
          Origem: {city}
        </Text>
      </div>
      <div className="text-right">
        <Text size={'MIN'} className="text-orange font-bold ">
          {value}
        </Text>
        <Text size={'MIN'}>Data da doação: {date}</Text>
      </div>
    </div>
  );
};

export default CandidateFinance;

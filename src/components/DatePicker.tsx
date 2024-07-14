import { useState } from 'react';
import { Text } from './base';
import { Option } from './base/forms/Select';
import { SelectBasic } from './base/forms/SelectBasic';
import { BoxIcon } from './box/BoxIcon';

let startYear = 1990;
let endYear = 2024;
let years = Array.from({ length: endYear - startYear + 1 }, (v, i) => ({
  value: i + startYear,
  label: (i + startYear).toString(),
}));

export const DatePicker = ({
  onSelectStart = () => {},
  onSelectEnd = () => {},
}: {
  // eslint-disable-next-line no-unused-vars
  onSelectStart?: (value: number | string, option: Option) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectEnd?: (value: number | string, option: Option) => void;
}) => {
  const [startDate, setStartDate] = useState<number>(years[0].value);
  const [endDate, setEndDate] = useState<number>(years[years.length - 1].value);

  return (
    <div className="bg-[#EDEDED] py-1 px-2 rounded-md flex text-black">
      <div className="flex justify-center items-center">
        <BoxIcon icon="Calendar" size={8} iconSize="xl" className="bg-white mr-2 shadow-xl" />
      </div>
      <div className="flex flex-col justify-center">
        <Text size="C2" className="text-grayLight3">
          Período
        </Text>
        <div className="flex align-text-bottom">
          <SelectBasic
            placeholder={years[0].label}
            onSelect={(value, option) => {
              onSelectStart(value, option);
              setStartDate(value as number);
            }}
            defaultValue={years[0].label}
            options={years.filter(val => val.value < endDate)}
            buttonProps={{ size: 'small', className: 'px-2' }}
          />
          <Text className="flex self-end">até </Text>
          <SelectBasic
            placeholder={years[years.length - 1].label}
            defaultValue={years[years.length - 1].label}
            onSelect={(value, option) => {
              onSelectEnd(value, option);
              setEndDate(value as number);
            }}
            options={years.filter(val => val.value > startDate)}
            buttonProps={{ size: 'small', className: 'px-2' }}
          />
        </div>
      </div>
    </div>
  );
};

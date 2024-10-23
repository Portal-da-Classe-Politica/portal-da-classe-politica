import { Icon, Text } from '@base';
import { Option, Select } from '@base/forms';
import { BoxIcon } from '@components/box/BoxIcon';

export const FilterSelect = ({
  className = 'flex flex-1',
  options,
  defaultValue,
  placeholder,
  label,
  error,
  onSelect,
}: {
  className?: string;
  options: Option[];
  defaultValue: string;
  placeholder: string;
  label: string;
  error: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: number | string, option: Option) => void;
}) => {
  return (
    <>
      <Select
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={className}
        buttonProps={{ style: 'fillGray', className: 'px-2 w-full' }}
        prefixComponent={
          <>
            <BoxIcon
              icon="Table"
              size={6}
              iconSize="sm"
              className="bg-white text-orange drop-shadow-md rounded-md mr-2"
            />
            <Text className="font-normal border-black border-r-2 pr-2 mr-2" textType="span">
              {label}
            </Text>
          </>
        }
        suffixComponent={<Icon type="ArrowDown" className="ml-2" />}
        onSelect={onSelect}
      />
      {error && <Text className="text-white font-bold">{error}</Text>}
    </>
  );
};

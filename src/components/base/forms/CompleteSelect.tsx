import { Icon, IconType } from '@base/Icon';
import { Text } from '@base/text';
import React from 'react';
import Select, { components, StylesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

type CompleteSelectType = {
  placeholder: string;
  prefixComponent?: {
    typeIcon?: IconType;
    prefixText?: string;
  };
  size?: 'B1' | 'B2';
  options: any;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: number | string) => void;
  selectedOption: any;
};

const customStyles: StylesConfig<OptionType, false> = {
  control: provided => ({
    ...provided,
    borderColor: 'hsl(0, 0%, 80%)',
    boxShadow: 'none',
    '&:active': {
      borderColor: '#EB582F !important',
      boxShadow: '0 0 0 1px #EB582F !important',
    },
    '&:focus': {
      boxShadow: '0 0 0 1px #EB582F !important',
      borderColor: '#EB582F !important',
    },
    '&:hover': {
      boxShadow: '0 0 0 1px #EB582F !important',
      borderColor: '#EB582F !important',
    },
  }),
  placeholder: provided => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
  singleValue: provided => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
};

const CustomSingleValue = ({ children, size, prefixComponent, ...props }: any) => (
  <components.SingleValue {...props}>
    {prefixComponent?.typeIcon && <Icon type={prefixComponent.typeIcon} className="mr-2" />}
    {prefixComponent?.prefixText && (
      <Text size={size} className="mr-2">
        {prefixComponent.prefixText} |
      </Text>
    )}
    <Text size={'B1'}>{children}</Text>
  </components.SingleValue>
);

const CustomPlaceholder = ({ children, prefixComponent, placeholder, ...props }: any) => (
  <>
    <components.Placeholder {...props}>
      <>{console.log('o quee', placeholder)}</>
      {prefixComponent && (
        <Text size="B1" className="mr-2">
          {prefixComponent?.prefixText}|{' '}
        </Text>
      )}
      <Text size="B1">{placeholder}</Text>
    </components.Placeholder>
  </>
);

const CompleteSelect = ({
  placeholder,
  prefixComponent,
  size = 'B1',
  options,
  selectedOption,
  onSelect,
}: CompleteSelectType) => {
  // const [selectedOption, setSelectedOption] = React.useState<OptionType | null>(null);

  return (
    <Select
      value={selectedOption.value ? selectedOption : null}
      onChange={onSelect}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      components={{
        SingleValue: props => <CustomSingleValue size={size} prefixComponent={prefixComponent} {...props} />,
        Placeholder: props => {
          console.log('what');
          return <CustomPlaceholder placeholder={placeholder} prefixComponent={prefixComponent} {...props} />;
        },

        IndicatorSeparator: null,
      }}
    />
  );
};

export default CompleteSelect;

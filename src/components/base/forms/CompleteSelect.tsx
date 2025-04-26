import { Icon, IconType } from '@base/Icon';
import { Text } from '@base/text';
import { ChipContainer } from '@components/ChipContainer';
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
  disabled?: boolean;
  size?: 'B1' | 'B2';
  options: any;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: number | string) => void;
  selectedOption: any;
  multiSelect: any;
};

const customStyles: StylesConfig<OptionType, false> = {
  option: () => ({
    padding: 5,
    cursor: 'pointer',
  }),
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
  <components.Placeholder {...props}>
    {prefixComponent && (
      <Text size="B2" className="mr-2">
        {prefixComponent?.prefixText}|{' '}
      </Text>
    )}
    <Text size="B2">{placeholder}</Text>
  </components.Placeholder>
);

const CompleteSelect = ({
  placeholder,
  prefixComponent,
  size = 'B2',
  options,
  disabled,
  selectedOption,
  multiSelect,
  onSelect,
}: CompleteSelectType) => {
  return (
    <Select
      value={selectedOption || null}
      onChange={onSelect}
      isMulti={(multiSelect === 'multiselect') as false} //typescript + lib com tipo errado por isso esse as false
      options={options}
      placeholder={placeholder}
      isDisabled={disabled}
      styles={customStyles}
      components={{
        SingleValue: props => <CustomSingleValue size={size} prefixComponent={prefixComponent} {...props} />,
        Placeholder: props => {
          return <CustomPlaceholder placeholder={placeholder} prefixComponent={prefixComponent} {...props} />;
        },
        MultiValue: props => {
          return (
            <div className="m-1">
              <ChipContainer onClick={() => props.selectOption(props.data)}>{props.data.label}</ChipContainer>
            </div>
          );
        },
        IndicatorSeparator: null,
      }}
    />
  );
};

export default CompleteSelect;

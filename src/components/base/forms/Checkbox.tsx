'use client';

import { useState } from 'react';
import { Icon } from '../Icon';
import { Text } from '../text';

interface CheckboxProps {
  label: string;
  value?: any;
  initialValue?: boolean;
  onClick?: (_checked: boolean, _value: any) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  initialValue = false,
  value = '',
  onClick = () => {},
  className = '',
}) => {
  const [checked, setChecked] = useState(initialValue);
  const _onClick = () => {
    setChecked(!checked);
    onClick(!checked, value);
  };

  return (
    <div
      className={`flex items-center p-2 bg-white rounded-lg drop-shadow-md cursor-pointer ${className}`}
      onClick={_onClick}
    >
      <div
        className={`w-[24px] h-[24px] flex items-center justify-center rounded ${
          checked ? 'bg-orange' : 'border border-orange'
        }`}
      >
        <Icon
          type={checked ? 'Checked' : 'UnChecked'}
          className={`${checked ? 'text-white' : 'text-orange'}`}
        />
      </div>
      <div className="flex-1">
        <Text size="C1" className="ml-4 text-black font-semibold">
          {label}
        </Text>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ButtonStyledProps } from '../buttons/ButtonStyled';
import { Text } from '../text/Text';
import { Icon } from '../Icon';

interface Option {
  value: number | string;
  label: string;
}

export const SelectBasic = ({
  options = [],
  defaultValue = '',
  placeholder = 'Select',
  className = '',
  onSelect = () => {},
  buttonProps = {},
  disabled = false,
}: {
  options: Option[];
  defaultValue?: number | string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (value: number | string, option: Option) => void;

  className?: string;
  placeholder?: string;
  buttonProps?: ButtonStyledProps;
  disabled?: boolean;
}) => {
  const [selectedOption, setSelectedOption] = useState(options.find(op => op.value === defaultValue));
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const onOptionSelected = (option: Option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelect(option.value, option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative w-fit inline-block ${className} cursor-pointer ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div
        onClick={onButtonClick}
        className={`flex justify-center items-center px-2 ${buttonProps.className}`}
      >
        <Text className="font-bold">{selectedOption?.label || placeholder}</Text>
        <Icon type="ArrowDown" size={18} className="ml-2" />
      </div>
      {showOptions && (
        <div className="z-10 origin-top-right absolute w-full rounded-md shadow-lg bg-white max-h-[200px] overflow-auto">
          <div className="">
            {options.map(option => (
              <div
                key={option.value}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => onOptionSelected(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

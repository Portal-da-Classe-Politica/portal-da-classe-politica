'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ButtonStyled, ButtonStyledProps } from '../buttons/ButtonStyled';
import { Text, TextSize } from '../text/Text';

export interface Option {
  value: number | string;
  label: string;
}

export const Select = ({
  options = [],
  defaultValue = '',
  placeholder = 'Select',
  className = '',
  onSelect = () => {},
  buttonProps = {},
  prefixComponent,
  suffixComponent,
  staticOptions = false,
  disabled = false,
  sizeInsideText = 'B2',
  biggerList = false,
  searchable = false,
}: {
  options: Option[];
  defaultValue?: number | string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (value: number | string, option: Option) => void;
  className?: string;
  placeholder?: string;
  buttonProps?: ButtonStyledProps;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  staticOptions?: boolean;
  disabled?: boolean;
  sizeInsideText?: TextSize;
  biggerList?: boolean;
  searchable?: boolean;
}) => {
  const [selectedOption, setSelectedOption] = useState(options.find(op => op.value === defaultValue));
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const onOptionSelected = (option: Option) => {
    setSelectedOption(option);
    setShowOptions(false);
    setSearchTerm('');
    onSelect(option.value, option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowOptions(false);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    setSelectedOption(options.find(op => op.value === defaultValue));
  }, [options, defaultValue]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const normalizeText = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const filteredOptions = options.filter(option =>
    normalizeText(option.label).includes(normalizeText(searchTerm)),
  );

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <ButtonStyled
        {...buttonProps}
        onClick={onButtonClick}
        className={`flex justify-center items-center ${buttonProps.className}`}
      >
        {prefixComponent}
        <Text className={staticOptions ? '' : 'font-bold'} size={sizeInsideText}>
          {staticOptions ? placeholder : (selectedOption?.label ?? placeholder)}
        </Text>
        {suffixComponent}
      </ButtonStyled>
      {showOptions && !disabled && (
        <div
          className={`z-10 origin-top-right absolute ${biggerList ? 'w-[160px]' : 'w-full'} rounded-md shadow-lg bg-white max-h-[300px] overflow-y-auto`}
        >
          {searchable && (
            <input
              type="text"
              className="w-full p-2 border-b text-sm text-gray-700 hover:bg-gray-200 focus:outline-none"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          )}
          <div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                  onClick={() => onOptionSelected(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-xs text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

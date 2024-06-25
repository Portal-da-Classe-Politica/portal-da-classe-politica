'use client';

import { Text } from '../text/Text';
import { ButtonStyled, ButtonStyledProps } from './ButtonStyled';

export interface ButtonProps extends ButtonStyledProps {
  text: string;
}

export const Button = ({ text, children, ...restProps }: ButtonProps) => {
  return (
    <ButtonStyled {...restProps}>
      <Text>{text}</Text>
    </ButtonStyled>
  );
};

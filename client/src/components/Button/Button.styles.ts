import styled, { css } from 'styled-components';
import { StylesProps } from './types';

const ButtonSizes = {
  small: '.55rem 1.6rem',
  default: '1rem 2rem',
  large: '1.2rem 2.8rem',
};

const PrimaryStyles = css`
  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    color: ${theme.colors.text.main};

    :active {
      background: ${theme.colors.primary.dark};
    }
    :hover {
      background: ${theme.colors.primary.dark};
    }
    :disabled {
      background: ${theme.colors.primary.light};
    }
  `};
`;

const DefaultStyles = css`
  ${({ theme }) => css`
    border-color: ${theme.colors.borderColor};
    color: ${theme.colors.text.secondary};
    background: #fff;
  `};
`;

const BaseStyles = css<StylesProps>`
  ${({ fullWidth, Size, borderRadius, margin }) => css`
    padding: ${Size && ButtonSizes[Size]};
    width: ${fullWidth && '100%'};
    border-radius: ${borderRadius};
    margin: ${margin && margin};
  `};
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  text-transform: capitalize;
  transition: all 150ms ease-in-out;
  border: 1px solid transparent;
  user-select: none;
  line-height: 1.5;
`;

export default styled.button<StylesProps>`
  ${BaseStyles};
  ${({ status }) => (status === 'primary' ? PrimaryStyles : DefaultStyles)}
`;

import styled, { css } from 'styled-components';
import { InputStylesProps } from './types';

const InputSizes = {
  small: '.5.6rem 1.2rem',
  default: '.8rem 1.6rem',
  large: '1.2rem 1.6rem',
};

export const InputContainer = styled.div<{ margin?: string }>`
  margin-bottom: ${({ margin }) => margin || '1.4rem'};
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes[0]}px;
  `};
  line-height: 1.5;
  color: #4f4f4f;
  text-transform: capitalize;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const InputBaseStyles = css<InputStylesProps>`
  ${({ theme, Size, borderRadius, withIcon, fullWidth }) => css`
    line-height: ${theme.lineHeight};
    padding: ${InputSizes[Size as keyof typeof InputSizes]};
    border: 1px solid ${theme.colors.borderColor};
    border-radius: ${borderRadius};
    padding-left: ${withIcon && '4rem'};
    width: ${fullWidth && '100%'};
    color: ${theme.colors.text.main};
    font-size: ${theme.fontSizes[1]}px;
    background-color: ${theme.colors.secondary.light};
  `};

  :focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ::placeholder {
    color: #828282;
    opacity: 0.9;
  }

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  outline: none;
`;
export const StyledInput = styled.input`
  ${InputBaseStyles};
`;

export const SvgIcon = styled.span`
  height: 2rem;
  width: 2rem;
  position: absolute;
  left: 1.2rem;
  color: #828282;
`;

export const TextArea = styled.textarea`
  ${InputBaseStyles};
  resize: none;
`;

export const SearchInput = styled(StyledInput)`
  padding-left: 4.6rem;

  :nth-child(1) {
    margin-bottom: 0;
  }
`;

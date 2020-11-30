import styled, { css } from 'styled-components';

export const AuthBoxContainer = styled.div<{ width?: string }>`
  ${({ theme, width }) => css`
    border-radius: ${theme.borderRadius};
    border: 1px solid ${theme.colors.borderColor};
    width: ${width && width};
  `};
  padding: 3.6rem;
`;

export const AuthBoxTitle = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeights[1]};
    font-size: ${theme.fontSizes[3]}px;
  `};
  text-transform: capitalize;
`;

export const AuthInfo = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

import styled, { css } from 'styled-components';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
}

export const StyledLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.primary.main};
    font-weight: ${theme.fontWeights[1]};
    font-size: ${theme.fontSizes[1]}px;
    :hover {
      color: ${theme.colors.primary.dark};
    }
    :active {
      color: ${theme.colors.primary.dark};
    }
  `};
  transition: color 150ms ease-in-out;
  outline: none;
  cursor: pointer;
`;

const Link: React.FC<LinkProps> = (props) => {
  const { href, ...rest } = props;
  return (
    <NextLink href={href}>
      <StyledLink {...rest} />
    </NextLink>
  );
};

export default Link;

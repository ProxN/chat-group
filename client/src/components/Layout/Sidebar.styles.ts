import styled, { css } from 'styled-components';
import Button from '@components/Button';
import Input from '@components/Input';

export const SidebarContainer = styled.aside`
  background: ${({ theme }) => theme.colors.secondary.main};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1.7rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeights[2]};
    font-size: ${theme.fontSizes[3]}px;
  `};
`;

export const AddButton = styled(Button)`
  ${({ theme }) => css`
    background: ${theme.colors.secondary.light};
    color: ${theme.colors.text.main};
  `};
  padding: 0.9rem;
  display: flex;
  border: none;
  svg {
    height: 1.4rem;
  }
`;

export const SidebarContent = styled.div`
  padding: 1.7rem 2.5rem;
  flex: 1;
`;

export const SearchInput = styled(Input.Search)`
  background: ${({ theme }) => theme.colors.secondary.light};
`;

export const Channels = styled.div`
  margin-top: 3.4rem;
  display: flex;
  flex-direction: column;
`;

export const Channel = styled.div`
  display: flex;
  align-items: center;
  transition: background 150ms ease-in-out;
  border-radius: 8px;
  padding: 0.5rem 0;
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.colors.secondary.light};
  }
`;

export const ChannelAvatar = styled.span`
  ${({ theme }) => css`
    background: ${theme.colors.secondary.light};
    font-weight: ${theme.fontWeights[2]};
  `};
  text-transform: uppercase;
  line-height: 4.2rem;
  text-align: center;
  border-radius: 8px;
  margin-right: 1.2rem;
  height: 4.2rem;
  width: 4.2rem;
`;

export const ChannelName = styled.div`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeights[2]};
    font-size: ${theme.fontSizes[1]}px;
  `};
  color: #bdbdbd;
  text-transform: uppercase;
`;

export const Footer = styled.div`
  background: ${({ theme }) => theme.colors.secondary.dark};
  padding: 1.7rem 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #bdbdbd;

  svg {
    height: 1.7rem;
  }
`;

export const Name = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeights[2]};
    font-size: ${theme.fontSizes[2]}px;
    color: ${theme.colors.text.secondary};
  `};
  flex: 1;
  margin-left: 2.8rem;
`;

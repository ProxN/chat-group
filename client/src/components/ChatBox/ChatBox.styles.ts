import Input from '@components/Input';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  grid-template-rows: 5.9rem 1fr 10rem;
`;

export const ChatHeader = styled.div`
  padding: 1.6rem 7rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ChannelName = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.fontWeights[2]};
    font-size: ${theme.fontSizes[2]}px;
  `};
`;

export const Messages = styled.div`
  padding: 4rem 7rem;
`;

export const Message = styled.div`
  display: grid;
  grid-template-columns: 4.2rem 1fr;
  align-items: center;
  grid-gap: 2.8rem;
  :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export const MessageInfo = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.fontWeights[2]};
    font-size: ${theme.fontSizes[2]}px;
  `};
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

export const MessageDate = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes[0]}px;
    font-weight: ${theme.fontWeights[0]};
  `};

  opacity: 0.8;
  margin: 0 2.2rem;
`;

export const MessageText = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights[1]};
`;

export const MessageInput = styled(Input)`
  background: #3c393f;
`;

export const Line = styled.span`
  height: 1px;
  background: #828282;

  flex: 1;
`;

export const DateSeparator = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

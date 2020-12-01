import Avatar from '@components/Avatar';
import Input from '@components/Input';
import {
  Container,
  ChannelName,
  ChatHeader,
  Messages,
  Message,
  MessageInfo,
  MessageDate,
  MessageText,
  MessageInput,
  DateSeparator,
  Line,
} from './ChatBox.styles';

const ChatBox = () => {
  return (
    <Container>
      <ChatHeader>
        <ChannelName>Welcome</ChannelName>
      </ChatHeader>
      <Messages>
        <Message>
          <Avatar />
          <div>
            <MessageInfo>
              Nellie Francis
              <MessageDate>yesterday at 2:29 AM</MessageDate>
            </MessageInfo>
            <MessageText>
              Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris
            </MessageText>
          </div>
        </Message>
        <Message>
          <Avatar />
          <div>
            <MessageInfo>
              Nellie Francis
              <MessageDate>yesterday at 2:29 AM</MessageDate>
            </MessageInfo>
            <MessageText>
              Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris
            </MessageText>
          </div>
        </Message>
        <Message>
          <Avatar />
          <div>
            <MessageInfo>
              Nellie Francis
              <MessageDate>yesterday at 2:29 AM</MessageDate>
            </MessageInfo>
            <MessageText>
              Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris
            </MessageText>
          </div>
        </Message>
        <DateSeparator>
          <Line />
          <MessageDate>August 3, 2020</MessageDate>
          <Line />
        </DateSeparator>
      </Messages>
      <form style={{ padding: '0 7rem' }}>
        <MessageInput placeholder='Type a message here' fullWidth />
      </form>
    </Container>
  );
};

export default ChatBox;

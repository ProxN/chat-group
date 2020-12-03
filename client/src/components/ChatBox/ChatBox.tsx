import Avatar from '@components/Avatar';
import Input from '@components/Input';
import { useChannelStore } from '@store/index';
import { IMesssage } from 'types';
import { groupMesssages } from 'utils/helpersFunc';
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

interface ChatBoxProps {
  messages?: IMesssage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const { selectedChannel } = useChannelStore();

  return (
    <Container>
      <ChatHeader>
        <ChannelName>{selectedChannel.name}</ChannelName>
      </ChatHeader>

      <Messages>
        {Object.keys(groupMesssages(messages)).map((el) => (
          <>
            <DateSeparator>
              <Line />
              <MessageDate>{el}</MessageDate>
              <Line />
            </DateSeparator>
            {(groupMesssages(messages)[el] as IMesssage[]).map((el) => (
              <Message>
                <Avatar />
                <div>
                  <MessageInfo>
                    Nellie Francis
                    <MessageDate>yesterday at 2:29 AM</MessageDate>
                  </MessageInfo>
                  <MessageText>{el.message}</MessageText>
                </div>
              </Message>
            ))}
          </>
        ))}
      </Messages>
      {/* <Messages>
        <DateSeparator>
          <Line />
          <MessageDate>August 3, 2020</MessageDate>
          <Line />
        </DateSeparator>
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
      </Messages> */}
      <form style={{ padding: '0 7rem' }}>
        <MessageInput placeholder='Type a message here' fullWidth />
      </form>
    </Container>
  );
};

export default ChatBox;

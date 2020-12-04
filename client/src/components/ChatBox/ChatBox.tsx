import { useForm, Controller } from 'react-hook-form';
import Avatar from '@components/Avatar';
import { useChannelStore } from '@store/index';
import { useSendMessage } from '@hooks/useChannel';
import { IMesssage } from 'types';
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
  messages?: Record<string, IMesssage[]>;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const { selectedChannel } = useChannelStore();
  const [mutate] = useSendMessage();

  const { control, handleSubmit, reset } = useForm<{ text: string }>();

  const onSubmit = (inputs: { text: string }) => {
    mutate({
      channelId: selectedChannel.id,
      text: inputs.text,
    });
    reset();
  };

  return (
    <Container>
      <ChatHeader>
        <ChannelName>{selectedChannel.name}</ChannelName>
      </ChatHeader>

      <Messages>
        {messages &&
          Object.keys(messages)
            .reverse()
            .map((el) => (
              <>
                <DateSeparator>
                  <Line />
                  <MessageDate>{el}</MessageDate>
                  <Line />
                </DateSeparator>
                {messages[el].reverse().map((msg) => (
                  <Message>
                    <Avatar />
                    <div>
                      <MessageInfo>
                        {msg.user.name}
                        <MessageDate>{msg.createdAt}</MessageDate>
                      </MessageInfo>
                      <MessageText>{msg.message}</MessageText>
                    </div>
                  </Message>
                ))}
              </>
            ))}
      </Messages>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '0 7rem' }}>
        <Controller
          render={(props) => (
            <MessageInput placeholder='Type a message here' fullWidth {...props} />
          )}
          name='text'
          control={control}
        />
      </form>
    </Container>
  );
};

export default ChatBox;

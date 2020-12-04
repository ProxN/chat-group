import { useEffect, useRef } from 'react';
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
import { useSubscription, gql } from '@apollo/client';
import { useQueryCache } from 'react-query';
import { useAuth } from 'context/authProvider';

interface ChatBoxProps {
  messages?: Record<string, IMesssage[]>;
}

const messageSubscription = gql`
  subscription {
    onMessageAdded {
      id
      message
      createdAt
    }
  }
`;

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const { selectedChannel } = useChannelStore();
  const cache = useQueryCache();
  const { user } = useAuth();
  const [mutate] = useSendMessage();
  useSubscription<{ onMessageAdded: IMesssage }>(messageSubscription, {
    onSubscriptionData: () => {
      cache.invalidateQueries(['messages', selectedChannel.id]);
    },
  });
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const { control, handleSubmit, reset } = useForm<{ text: string }>();

  const onSubmit = (inputs: { text: string }) => {
    mutate({
      channelId: selectedChannel.id,
      text: inputs.text,
    });
    reset();
  };

  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [messages]);

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
              <div key={el}>
                <DateSeparator>
                  <Line />
                  <MessageDate>{el}</MessageDate>
                  <Line />
                </DateSeparator>
                {messages[el].map((msg) => (
                  <Message key={msg.id}>
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
              </div>
            ))}

        <div ref={messagesRef} />
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

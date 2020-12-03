import ChatBox from '@components/ChatBox';
import Loader from '@components/Loader';
import { useMessages } from '@hooks/useChannel';
import { useChannelStore } from '@store/index';

const Index = () => {
  const { selectedChannel } = useChannelStore();

  console.log(selectedChannel);
  const { data: messages, isLoading } = useMessages(selectedChannel.id);

  if (isLoading) return <Loader size='small' />;

  return <ChatBox messages={messages} />;
};

export default Index;

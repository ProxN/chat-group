import ChatBox from '@components/ChatBox';
import Loader from '@components/Loader';
import { useMessages } from '@hooks/useChannel';
import { useChannelStore } from '@store/index';
import { IMesssage } from 'types';
import { groupMesssages } from 'utils/helpersFunc';

const Index = () => {
  const { selectedChannel } = useChannelStore();

  const { data: messages, isLoading, isFetching, isFetched } = useMessages(selectedChannel.id);
  if (!isFetched && (isLoading || isFetching)) return <Loader size='small' />;

  return <ChatBox messages={groupMesssages(messages as IMesssage[])} />;
};

export default Index;

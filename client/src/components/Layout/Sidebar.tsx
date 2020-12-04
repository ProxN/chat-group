import { useEffect } from 'react';
import Avatar from '@components/Avatar';
import AddChannel from '@components/AddChannel';
import Loader from '@components/Loader';
import PlusSVG from '@assets/plus.svg';
import ArrowDownSVG from '@assets/chevron.svg';
import { useChannels } from '@hooks/useChannel';
import { useChannelStore, useModalStore } from '@store/index';
import { IChannel } from 'types';
import {
  SidebarContainer,
  Header,
  HeaderTitle,
  AddButton,
  SidebarContent,
  SearchInput,
  Channel,
  ChannelAvatar,
  ChannelName,
  Channels,
  Footer,
  Name,
} from './Sidebar.styles';

const getAvatarText = (name: string): string => {
  const channelName = name.split(' ');
  const firstLetter = channelName[0][0];
  return channelName.length === 1 ? firstLetter : firstLetter + channelName[1][0];
};

const Sidebar = () => {
  const { data, isLoading } = useChannels();
  const { openModal } = useModalStore();
  const { setSelectedChannel, selectedChannel } = useChannelStore();

  const handleOpenModal = () => {
    openModal({
      render: <AddChannel />,
      props: {
        title: 'New Channel',
        width: '65rem',
      },
    });
  };

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      setSelectedChannel(data[0]);
    }
  }, [isLoading]);

  const handleChannelClick = (channel: IChannel) => {
    setSelectedChannel(channel);
  };

  return (
    <SidebarContainer>
      {isLoading && <Loader size='small' />}
      {!isLoading && (
        <>
          <Header>
            <HeaderTitle>Channels</HeaderTitle>
            <AddButton onClick={handleOpenModal} Size='small'>
              <PlusSVG />
            </AddButton>
          </Header>
          <SidebarContent>
            <form>
              <SearchInput fullWidth placeholder='Search...' Size='large' />
            </form>
            <Channels>
              {data?.map((el) => (
                <Channel
                  onClick={() => handleChannelClick(el)}
                  active={el.id === selectedChannel.id}
                  key={el.id}
                >
                  <ChannelAvatar>{getAvatarText(el.name)}</ChannelAvatar>
                  <ChannelName>{el.name}</ChannelName>
                </Channel>
              ))}
            </Channels>
          </SidebarContent>
          <Footer>
            <Avatar />
            <Name>Ayoub kanoun</Name>
            <ArrowDownSVG />
          </Footer>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

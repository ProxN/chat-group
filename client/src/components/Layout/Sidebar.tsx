import Avatar from '@components/Avatar';
import AddChannel from '@components/AddChannel';
import Loader from '@components/Loader';
import PlusSVG from '@assets/plus.svg';
import ArrowDownSVG from '@assets/chevron.svg';
import { useChannels } from '@hooks/useChannel';
import { useModalStore } from '@store/index';
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

  const handleOpenModal = () => {
    openModal({
      render: <AddChannel />,
      props: {
        title: 'New Channel',
        width: '65rem',
      },
    });
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
                <Channel key={el.id}>
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

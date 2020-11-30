import Avatar from '@components/Avatar';
import PlusSVG from '@assets/plus.svg';
import ArrowDownSVG from '@assets/chevron.svg';
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

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Header>
        <HeaderTitle>Channel</HeaderTitle>
        <AddButton Size='small'>
          <PlusSVG />
        </AddButton>
      </Header>
      <SidebarContent>
        <form>
          <SearchInput fullWidth placeholder='Search...' Size='large' />
        </form>
        <Channels>
          <Channel>
            <ChannelAvatar>W</ChannelAvatar>
            <ChannelName>Welcome</ChannelName>
          </Channel>
          <Channel>
            <ChannelAvatar>CA</ChannelAvatar>
            <ChannelName>Cats and dogs</ChannelName>
          </Channel>
        </Channels>
      </SidebarContent>
      <Footer>
        <Avatar />
        <Name>Ayoub kanoun</Name>
        <ArrowDownSVG />
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;

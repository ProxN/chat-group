import { IChannel } from 'types';
import create, { State, SetState } from 'zustand';

interface IChannelState extends State {
  selectedChannel: IChannel;
  setSelectedChannel: (channelId: IChannel) => void;
}

const useChannelStore = create<IChannelState>(
  (set: SetState<IChannelState>): IChannelState => ({
    selectedChannel: {
      id: '',
      description: '',
      name: '',
    },
    setSelectedChannel: (channelId: IChannel) => {
      set({ selectedChannel: channelId });
    },
  })
);

export default useChannelStore;

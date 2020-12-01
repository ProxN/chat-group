import { useMutation, useQuery, useQueryCache } from 'react-query';
import { AddChannelInputs } from 'types/inputs';
import { IChannel, IError } from '../types';
import graphqlClient, { gql } from '../utils/graphqlClient';

interface ChannelResponse extends IError {
  channel: IChannel;
}
export const useChannels = () => {
  return useQuery('channels', async () => {
    const res = await graphqlClient.request<{ channels?: IChannel[] }>(gql`
      {
        channels {
          id
          name
          description
        }
      }
    `);
    return res.channels;
  });
};

export const useAddChannel = () => {
  const cache = useQueryCache();

  return useMutation(
    async (data: AddChannelInputs) => {
      const res = await graphqlClient.request<{ createChannel: ChannelResponse }>(
        gql`
          mutation new($name: String!, $description: String!) {
            createChannel(name: $name, description: $description) {
              error {
                field
                message
              }
              channel {
                id
                name
                description
              }
            }
          }
        `,
        data
      );
      return res.createChannel;
    },
    {
      onMutate: (data) => {
        const prevData = cache.getQueryData('channels');

        cache.setQueryData('channels', (old) => [
          ...(old as IChannel[]),
          {
            id: 'temp',
            ...data,
          },
        ]);

        return () => cache.setQueryData('channels', prevData);
      },
      onSettled: () => cache.invalidateQueries('channels'),
    }
  );
};

import graphqlClient, { gql } from './graphqlClient';
import { IUser } from '../types';

const getUser = async () => {
  try {
    const res = await graphqlClient.request<{ me: IUser }>(gql`
      {
        me {
          id
          email
          name
          avatar
        }
      }
    `);
    return res.me;
  } catch (error) {
    return null;
  }
};

export default getUser;

import { GraphQLClient, gql } from 'graphql-request';

const endPoint = 'http://localhost:5000/graphql';

const graphqlClient = new GraphQLClient(endPoint, {
  credentials: 'include',
});

export { gql };

export default graphqlClient;

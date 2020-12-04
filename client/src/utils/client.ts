import { split, HttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: 'ws://localhost:5000/graphql',
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'same-origin',
});

const link = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httplink
    )
  : httplink;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;

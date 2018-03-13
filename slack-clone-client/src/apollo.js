import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      'x-token':localStorage.getItem('token'),
      'x-refresh-token': localStorage.getItem('refreshToken'),
    }
  });
  return forward(operation);
})

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();
  if(headers){
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');

    if(token){
      localStorage.setItem('token', token);
    }

    if(refreshToken){
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  return forward(operation);
});

const link = afterwareLink.concat(authMiddleware.concat(httpLink));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
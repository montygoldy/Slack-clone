import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import Routes from './routes'
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const App = (
  <ApolloProvider>
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();

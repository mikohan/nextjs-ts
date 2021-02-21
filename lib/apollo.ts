import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { API_URL } from 'config';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  // create an authentication link
  const authLink = setContext((_, { headers }) => {
    // get the auth token from localstorage if exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authentication: token ? `Bearer ${token}` : '',
      },
    };
  });
  const httpLink = new HttpLink({
    uri: API_URL,
    credentials: 'include',
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

// initialize apollo client with context and initial state
export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // for SSR or SSG always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // create the Apollo client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

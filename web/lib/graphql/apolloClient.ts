'use client';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider as ApolloProviderClient,
} from '@apollo/client';

const graphqlUri =
  typeof window !== 'undefined'
    ? '/graphql'
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/graphql`;

const httpLink = new HttpLink({
  uri: graphqlUri,
  credentials: 'same-origin',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProviderClient client={apolloClient}>{children}</ApolloProviderClient>;
}

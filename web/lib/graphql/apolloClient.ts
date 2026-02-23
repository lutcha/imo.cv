'use client';

import React from 'react';

// Apollo/GraphQL is reserved for future use.
// Currently the app uses REST APIs via axios.

export const apolloClient = null;

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}

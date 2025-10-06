'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { apolloClient } from './apollo-client';

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
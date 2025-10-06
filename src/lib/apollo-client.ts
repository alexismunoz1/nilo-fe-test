import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://graphqlpokemon.favware.tech/v8",
  headers: {
    'Content-Type': 'application/json',
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getAllPokemon: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
        getFuzzyPokemon: {
          keyArgs: ["pokemon"],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    Pokemon: {
      keyFields: ["key"],
    },
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

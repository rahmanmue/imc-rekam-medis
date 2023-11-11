import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://fit-quagga-23.hasura.app/v1/graphql",
  headers: {
    "x-hasura-access-key":
      "hIi0KGqtu7sWwMJxzF87B7aPWLv50Oqhm5uYo17kIDlJk4PNU1GVT0SeTU7a16G3",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://fit-quagga-23.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-access-key":
          "hIi0KGqtu7sWwMJxzF87B7aPWLv50Oqhm5uYo17kIDlJk4PNU1GVT0SeTU7a16G3",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://excited-moccasin-70.hasura.app/v1/graphql",
  headers: {
    "x-hasura-access-key":
      "F1VmGgmvcQ4FYm282vDaAiIaHzZzL87OPqyZuLD9Bc4VdTKD00jBqWWdqDy4JoGa",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://excited-moccasin-70.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-access-key":
          "F1VmGgmvcQ4FYm282vDaAiIaHzZzL87OPqyZuLD9Bc4VdTKD00jBqWWdqDy4JoGa",
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

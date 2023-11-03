import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { isRole } from "../utils";

const user = isRole(localStorage.getItem("user_role") || "user");

const httpLink = new HttpLink({
  uri: "https://fit-quagga-23.hasura.app/v1/graphql",
  headers: {
    "x-hasura-access-key":
      "hIi0KGqtu7sWwMJxzF87B7aPWLv50Oqhm5uYo17kIDlJk4PNU1GVT0SeTU7a16G3",
    "x-hasura-role": user,
    "x-hasura-user-id": localStorage.getItem("id") || " ",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://fit-quagga-23.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-access-key":
          "hIi0KGqtu7sWwMJxzF87B7aPWLv50Oqhm5uYo17kIDlJk4PNU1GVT0SeTU7a16G3",
        "x-hasura-role": user,
        "x-hasura-user-id": localStorage.getItem("id") || " ",
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

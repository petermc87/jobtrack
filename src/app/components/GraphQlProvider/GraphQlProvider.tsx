"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function GraphQlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    // Graph server address
    uri: "http://localhost:3000/api/graphql",
    // Data cached from ApolloServer.
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div>{children}</div>
      </ApolloProvider>
    </>
  );
}

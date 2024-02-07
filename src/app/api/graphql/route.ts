import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "../../../../graphql/resolvers";
import { typeDefs } from "../../../../graphql/typeDefs";

import prisma from "../../../../prisma/db";

// Declaring the type as the Prismaclient.
export type Context = {
  prisma: PrismaClient;
};

// Passing in the Context(Prisma) to Apollo server.
const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});

export { handler as GET, handler as POST };

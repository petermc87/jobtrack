// export { Context }

import { Context } from "@/app/api/graphql/route";

export const resolvers = {
  // GET requests --> Users
  Query: {
    users: async (parent: any, args: any, context: Context) => {
      try {
        const users = await context.prisma.user.findMany();
        //  Returns an empy array if null.
        return users || [];
      } catch (error) {
        console.error("Error fetching users", error);
        throw new Error("Unable to fetch users");
      }
    },
    user: async (parent: any, args: any, context: Context) => {
      try {
        const user = await context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
        return user;
      } catch (error) {
        console.error("Error when fetching user: ", error);
        throw new Error("Unable to fetch user");
      }
    },
  },
  // GET request --> for User to get the Categories contained within.
  User: {
    categories: async (parent: any, args: any, context: Context) => {
      try {
        const categories = await context.prisma.category.findMany({
          where: {
            userId: parent.id,
          },
        });
        return categories || [];
      } catch (error) {
        console.error("Error when fetching categories: ", error);
        throw new Error("Unable to fetch categories");
      }
    },
  },
};

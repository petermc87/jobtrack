// export { Context }
import { Context } from "@/app/api/graphql/route";
import bcrypt from "bcrypt";

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
    categories: async (parent: any, args: any, context: Context) => {
      try {
        const categories = await context.prisma.category.findMany();
        return categories || [];
      } catch (error) {
        console.error("Error when fetching categories: ", error);
        throw new Error("Unable to fetch categories");
      }
    },
    category: async (parent: any, args: any, context: Context) => {
      try {
        const category = await context.prisma.category.findUnique({
          where: {
            id: args.id,
          },
        });
        return category;
      } catch (error) {
        console.error("Error when fetching category", error);
        throw new Error("Unable to fetch category");
      }
    },
    jobs: async (parent: any, args: any, context: Context) => {
      try {
        const jobs = await context.prisma.job.findMany();
        return jobs || [];
      } catch (error) {
        console.error("Error when fetching jobs", error);
        throw new Error("Unable to fetch jobs");
      }
    },
    job: async (parent: any, args: any, context: Context) => {
      try {
        const job = await context.prisma.job.findUnique({
          where: {
            id: args.id,
          },
        });
        return job;
      } catch (error) {
        console.error("Error when fetching job", error);
        throw new Error("Unable to fetch job");
      }
    },
  },
  // User to get the Categories contained within. - GET
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
  Mutation: {
    newUser: async (parent: any, args: any, context: Context) => {
      // Checking if email exists
      let checkEmail;

      try {
        checkEmail = await context.prisma.user.findUnique({
          where: {
            email: args.email,
          },
        });
      } catch (error) {
        console.error("The fetch request could not be performed", error);
        throw new Error(
          "Unable to perform fetch. NOTE: This means there is an error with performing the prisma request, not because there wasnt an email match"
        );
      }

      // Breaking down the response
      if (checkEmail) {
        // Returning it back to the client
        return "Email already exists";
      } else {
        const saltRounds = 10;
        let saltedPassword = await bcrypt.hash(args.password, saltRounds);
        // Adding user to database
        try {
          const newUser = await context.prisma.user.create({
            data: {
              email: args.email,
              password: saltedPassword,
              name: args.name,
              username: args.username,
            },
          });
          return newUser;
        } catch (error) {
          console.error("Error when signing up", error);
          throw new Error("Unable to create user");
        }
      }
    },
    updateUser: async (parent: any, args: any, context: Context) => {
      const updateData: { [key: string]: any } = {}; // Define an empy object to hold the key:value
      // pair being passed in.

      // Populating the new object with the data
      updateData[args.type] = args.item;
      try {
        // Update the user using the populated object.
        const updatedUser = await context.prisma.user.update({
          where: {
            id: args.id,
          },
          data: updateData,
        });
        return updatedUser;
      } catch (error) {
        console.error("Error updating the user", error);
        throw new Error("Unable to update user");
      }
    },
  },
};

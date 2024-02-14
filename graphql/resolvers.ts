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
            email: args.email,
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
  Category: {
    jobs: async (parent: any, args: any, context: Context) => {
      try {
        const returnedJobs = await context.prisma.job.findMany({
          where: {
            categoryId: parent.id,
          },
        });
        return returnedJobs || [];
      } catch (error) {
        console.error("Error when fetching jobs: ", error);
        throw new Error("Unable to fetch jobs");
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
      updateData[args.type] = args.newValue;
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
    deleteUser: async (parent: any, args: any, context: Context) => {
      try {
        const deletedUser = await context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return deletedUser;
      } catch (error) {
        console.error("Unable to delete user", error);
        throw new Error("Error deleting user");
      }
    },
    newCategory: async (parent: any, args: any, context: Context) => {
      try {
        const category = await context.prisma.category.create({
          data: {
            name: args.name,
            userId: args.userId,
          },
        });
        return category;
      } catch (error) {
        console.error("Unable to create category", error);
        throw new Error("Error when creating category");
      }
    },
    updateCategory: async (parent: any, args: any, context: Context) => {
      try {
        const updatedCategory = await context.prisma.category.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.newName,
          },
        });
        return updatedCategory;
      } catch (error) {
        console.error("Unable to update category", error);
        throw new Error("Error when updating category");
      }
    },
    deleteCategory: async (parent: any, args: any, context: Context) => {
      try {
        const deletedCategory = await context.prisma.category.delete({
          where: {
            id: args.id,
          },
        });
        return deletedCategory;
      } catch (error) {
        console.error("Unable to delete category", error);
        throw new Error("Error when deleting category");
      }
    },
    newJob: async (parent: any, args: any, context: Context) => {
      try {
        const job = await context.prisma.job.create({
          data: {
            title: args.title,
            link: args.link,
            jobDescription: args.jobDescription,
            categoryId: args.categoryId,
            resumeLink: args.resumeLink,
          },
        });
        return job;
      } catch (error) {
        console.error("Unable to create job", error);
        throw new Error("Error when creating job");
      }
    },
    updateJob: async (parent: any, args: any, context: Context) => {
      const updateData: { [key: string]: any } = {};

      updateData[args.type] = args.newValue;

      try {
        const updatedJob = await context.prisma.job.update({
          where: {
            id: args.id,
          },
          data: updateData,
        });
        return updatedJob;
      } catch (error) {
        console.error("Unable to update job", error);
        throw new Error("Error when updating job");
      }
    },
    deleteJob: async (parent: any, args: any, context: Context) => {
      try {
        const deletedJob = await context.prisma.job.delete({
          where: {
            id: args.id,
          },
        });
        return deletedJob;
      } catch (error) {
        console.error("Unable to delete job");
        throw new Error("Error deleting Job");
      }
    },
  },
};

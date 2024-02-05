import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../../prisma/db";

declare module "next-auth" {
  interface User {
    id: number;
    password: string | undefined | number | null;
    email: string | undefined | null;
    username: string | undefined | null;
  }
  interface Session {
    user: {
      id: number | unknown;
      username: string | unknown;
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter your email..." },
        password: { label: "Password", placeholder: "Enter your password..." },
      },
      async authorize(credentials, req) {
        try {
          // Credentials check
          if (!credentials) throw new Error("No credentials to login");

          // Get user object.
          const user = db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // Compare passwords
          const logged = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // If its not there, throw an error!
          if (!logged) throw new Error("Invalid credentials");

          return user as any; // fix for https://github.com/nextauthjs/next-auth/issues/2701
        } catch (ignored) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;

      // Add oauthStore.

      return session;
    },

    // Populating the token with the current session
    jwt({ token, account, trigger, session, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        // Next auth User import??
        token.username = (user as User).username;
      }

      // Updating the username and email in the front end
      // if the user info is being updated.

      if (trigger === "update" && session?.name) token.name = session.name;

      if (trigger === "update" && session?.username)
        token.username = session.username;

      if (trigger === "update" && session?.email) token.email = session.email;

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SESSION_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

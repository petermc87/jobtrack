import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../../../prisma/db";

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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

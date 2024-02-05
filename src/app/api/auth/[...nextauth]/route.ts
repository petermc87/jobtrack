import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter your email..." },
        password: { label: "Password", placeholder: "Enter your password..." },
      },
      authorize(credentials, req) {
        // Test the crendtials provider.
        if (
          credentials?.email === "this@mail.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "123",
            email: "this@mail.com",
          };
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

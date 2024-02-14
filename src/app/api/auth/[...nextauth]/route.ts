// "use client";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import oauthStore from "../../../../../actions/oAuth/OAuthStore";
import db from "../../../../../prisma/db";

declare module "next-auth" {
  interface User {
    id: string | unknown;
    password?: string | undefined | number | null;
    email: string | undefined | null;
    username?: string | undefined | null;
  }
  interface Session {
    user: {
      id: string | unknown;
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
        if (!credentials || !credentials.email || !credentials.password)
          // ERROR: When either no credentials, the email OR the password were not
          // provided. NOTE: This will likely not happen because of the required
          // input fields in the login form. This is to satisfy types.
          // return "Please enter email and password";
          return null;

        // ---> FETCH THROUGH GRAPHQL <--- //
        // Finding the user object
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // ERROR: No user from the database found
        if (user === null || !user) return null;

        // Checking the password.
        if (user?.email && user?.password) {
          // Checking both passwords.
          console.log(credentials.password, user?.password);
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password || ""
          );
          if (!isPasswordValid) {
            //ERROR: Invalid password
            return null;
          }
          return user as any;
        }

        // ERROR: When the email AND password were not provided.
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // TEST: Connecting the Apollo cleint here.
    // async signIn(user, account, profile) {
    //   if (account.provider === "google") {
    //     try {
    //       await ApolloClient.arguments({
    //         MutationObserver: NEW_USER,
    //         variables: {
    //           name: profile.name,
    //           email: profile.email,
    //         },
    //       });
    //     } catch (error) {
    //       console.error("Unable to save to the database: ", error);
    //       throw new Error("Error when saving google user");
    //     }
    //   }
    // },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;

      // Add oauthStore persist to session storage.
      const userSession = session.user as User;
      const returnedUser = await oauthStore(userSession);
      session.user.username = returnedUser.username;

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

///--- THIS CODE BLOCK FOR AUTHORIZE DIDNT RIDIRECT TO HOME --- ///
// Here is what was returned in the terminal:
// {
//   then: [Function: then],
//   catch: [Function: catch],
//   finally: [Function: finally],
//   requestTransaction: [Function: requestTransaction],
//   [Symbol(Symbol.toStringTag)]: 'PrismaPromise'
// }

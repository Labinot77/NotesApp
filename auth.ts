import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaClient } from "@prisma/client";
import { saltAndHashPassword } from "./lib/PasswordHash";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db as PrismaClient),
  session: {strategy: "jwt"},
  pages: {
    signIn: "/authentication/sign-in",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session
    },
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SERCRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
    name: "Credentials",
    credentials: {
      name: {
        label: "name",
        type: "name",
      },
      email: {
        label: "Email",
        type: "email",
      },
      password: {
        label: "Password",
        type: "password",
      },
    },
    authorize: async (credentials) => {
      if (!credentials.name || !credentials.email || !credentials.password) {
        return null;
      }

      const name = credentials.name as string;
      const email = credentials.email as string;
      const hashedPassword = saltAndHashPassword(credentials.password);

      let user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        user = await db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
      } else {
        
        if (user.password !== hashedPassword) {
          return null;
        }
      }

      return user;
    },
  }),
  ],
})
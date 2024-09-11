import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaClient } from "@prisma/client";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db as PrismaClient),
  session: {strategy: "jwt"},
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
      clientSecret: process.env.GOOGLE_CLIENT_SERCRET,
    }),
    Credentials({
    name: "Credentials",
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "example@email.com",
      },
      password: {
        label: "Password",
        type: "password",
      },
    },
    authorize: async (credentials) => {
      if (!credentials.email || !credentials.password) {
        return null;
      }
      
      const email = credentials.email as string;
      const password = credentials.password as string;

      let user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        user = await db.user.create({
          data: {
            email,
            password: password,
          },
        });
      } else {
        if (user.password !== password) {
          return null;
        }
      }
      
      return user;
    },
  }),
  ],
})
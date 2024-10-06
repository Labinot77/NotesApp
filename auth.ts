import NextAuth from "next-auth"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserLoginValidation } from "./lib/validations/UserValidation";
import { getUserByEmail } from "./lib/actions/UserActions";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(db as PrismaClient),
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  pages: {
    signIn: "/authentication/sign-in",
    error: "/authentication/error",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      
      session.user.id = token.id as string || token.sub as string; 

      return session;
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
    async authorize(credentials) { 
        const validatedFields = UserLoginValidation.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)

          // by no password and email I mean that the user is using a social login (Google, Github, etc.)
          if (!user || !user.password || !user.email ) return null

          // check if passwords match
          const result = await bcrypt.compare(password, user.password)

          if (!result) return null

          return user
        }
        
        return null
      }
    }),
  ],
})
"use server"

import { auth } from "@/auth";
import { db } from "@/db"
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { UserSettings } from "../validations/UserValidation";

export async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({
    where: {
      email
    },
  })

  if (!user) {
    return null
  }

  return user
}

export const getUserSession = async () => {
  const session = await auth()

  if (!session?.user) {
    return console.log('No user found')
  }

  try {
    const currentSessionUser = await db.user.findUnique({
      where: {
        id: session.user.id as string
      },
    })

    // if (!currentSessionUser?.id) {
    //   return "No user found"
    // }

    return currentSessionUser
  } catch (error) {
    return console.log("getUserSession", error)
  }
}

export async function getUserData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true
    },
  })

  return data
}

export async function SaveUserData(values: z.infer<typeof UserSettings>) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  await db.user.update({
    where: {
      id: session.user?.id
    },
    data: {
      name: values.username,
      email: values.email,
      image: values.image,
    }
  })

  revalidatePath('/dashboard/settings') 
}
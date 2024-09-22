"use server"

import { signIn } from "@/auth"
import { revalidatePath } from "next/cache"

export const loginWithSocial = async (provider: string) => {
  await signIn(provider, {
    redirectTo: "/",
  })
  revalidatePath("/dashboard")
}
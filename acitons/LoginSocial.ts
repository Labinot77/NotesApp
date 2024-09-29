"use server"

import { signIn } from "@/auth"
import { revalidatePath } from "next/cache"

export const loginWithSocial = async (provider: string) => {
  await signIn(provider, {
    redirectTo: "/dashboard",
  })
  revalidatePath("/dashboard")
}
'use server'

import { signIn } from "@/auth"
import { getUserEmail } from "@/lib/actions/UserActions"
import { UserLoginValidation } from "@/lib/validations/UserValidation"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { z } from "zod"

export const login = async (values: z.infer<typeof UserLoginValidation>) => {
  const validateField = UserLoginValidation.safeParse(values)

  if (!validateField.success) {
    return { error: "Invalid data" }
  }

  const { email, password } = validateField.data
  const existingUser = await getUserEmail(email)

  if (!existingUser) {
    return { error: "Invalid credentials!" }
  }
  
  try {
    const res = await signIn("credentials", { 
      redirect: false,
      email: email, 
      password: password
     })

    if (!res.error) {
      return redirect("/dashboard")
    }

  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}
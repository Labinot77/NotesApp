'use server'

import { signIn } from "@/auth"
import { db } from "@/db"
import { getUserEmail } from "@/lib/actions/UserActions"
import { UserLoginValidation } from "@/lib/validations/UserValidation"
import { z } from "zod"

export const login = async (values: z.infer<typeof UserLoginValidation>) => {
  const validateField = UserLoginValidation.safeParse(values)

  if (!validateField.success) {
    return { error: "Invalid data" }
  }

  const { email, password } = validateField.data
  const existingUser = getUserEmail(email)

  if (!existingUser) {
    return { error: "Invalid credentials!" }
  }


  try {
    const result = await signIn("credentials", {
      email,
      password,
    })

    if (result?.error) {
      return { error: "Invalid credentials!" }
    }

  } catch (error) {
    
  }
  

}
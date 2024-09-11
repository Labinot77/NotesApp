"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { UserCreationValidation } from "@/lib/validations/UserValidation";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/dashboard");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (values: z.infer<typeof UserCreationValidation>) => {
  const rawFormData = {
    name: values.name,
    email: values.email,
    password: values.password,
    role: "ADMIN",
    redirectTo: "/",
  };

  // Testing
  const existingUser = await getUserByEmail(values.email as string);
  console.log(existingUser);

  try {
    await signIn("credentials", rawFormData);
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
  revalidatePath("/");
};
"use server";

import { signIn } from "@/auth";
import { getUserEmail } from "@/lib/actions/UserActions";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerficicationToken } from "@/lib/tokens";
import { UserLoginValidation } from "@/lib/validations/UserValidation";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof UserLoginValidation>) => {
  const validateField = UserLoginValidation.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid data" };
  }

  const { email, password } = validateField.data;
  const existingUser = await getUserEmail(email);

  if (!existingUser) {
    return { error: "Invalid credentials!" };
  }

    // ** First check if the credentials match with the inputed ones, and if matched then log in the user/send an verification email
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res.error) {
      return { error: "Invalid credentials!", description: "Login Failed" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerficicationToken(existingUser.email);
  
      await sendVerificationEmail(
        verificationToken.identifier,
        verificationToken.token
      );
  
      return {
        title: "Email not verified",
        description: "Email is sent! Please check your email inbox!",
      };
    }

    return {
      title: "Login Success",
      description: "You are logged in!",
      redirect: "/dashboard",
    };
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
};

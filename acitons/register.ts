"use server";

import { db } from "@/db";
import { getUserEmail } from "@/lib/actions/UserActions";
import { saltAndHashPassword } from "@/lib/PasswordHash";
import { UserCreationValidation } from "@/lib/validations/UserValidation";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";


export const register = async (values: z.infer<typeof UserCreationValidation>) => {
const validateField = UserCreationValidation.safeParse(values);

 if (!validateField.success) {
   return { error: "Invalid data" };
 }

 const { name, email, password } = validateField.data;
 const hasedPassword = await saltAndHashPassword(password);

 const existingUser = await getUserEmail(email);

 if (existingUser) {
   return { error: "User already exists" };
 }

 await db.user.create({
   data: {
    name,
    email,
    password: hasedPassword,
   }
 })


 return { success: "success" };

}
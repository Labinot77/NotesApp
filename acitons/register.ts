"use server";

import { db } from "@/db";
import { getUserEmail } from "@/lib/actions/UserActions";
import { saltAndHashPassword } from "@/lib/PasswordHash";
import { UserCreationValidation } from "@/lib/validations/UserValidation";
import { z } from "zod";


export const register = async (values: z.infer<typeof UserCreationValidation>) => {
const validateField = UserCreationValidation.safeParse(values);
 if (!validateField.success) {
   return { error: "Invalid data" };
 }

 const { name, email, password } = validateField.data;
 const hasedPassword = saltAndHashPassword(password);

 const existingUser = await getUserEmail(email);

 if (existingUser) {
   return { error: "User with that email already exists" };
 }

 await db.user.create({
   data: {
    name,
    email,
    password: hasedPassword,
   }
 })


 return { description: "Your account has been created successfully" };

}
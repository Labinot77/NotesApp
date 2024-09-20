 
import { z } from "zod"
import { noSpaces } from "../Miscellaneous"

export const UserLoginValidation = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(6).max(50).refine(noSpaces, {
    message: "Password cannot contain spaces",
    }),
})

export const UserCreationValidation = z.object({
  name: z.string().min(2, {
    message: "Name is required"
  }).max(15),
  email: z.string().min(2).max(50).email(),
  password: z.string().min(6).max(50).refine(noSpaces, {
    message: "Password cannot contain spaces",
  }),
})

export const UserSettings = z.object({
  username: z.string().min(2).max(15),
  email: z.string().min(2).max(222),
})
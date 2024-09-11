"use client"
 
import { z } from "zod"

export const UserCreationValidation = z.object({
  name: z.string().min(2).max(15),
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
})

export const UserSettings = z.object({
  username: z.string().min(2).max(15),
  email: z.string().min(2).max(222),
})
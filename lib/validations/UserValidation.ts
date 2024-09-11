"use client"
 
import { z } from "zod"

export const UserCreationValidation = z.object({
  email: z.string().min(2).max(15),
  password: z.string().min(6).max(20),
})

export const UserSettings = z.object({
  username: z.string().min(2).max(15),
  email: z.string().min(2).max(15),
  id: z.string().min(2).max(15),
})
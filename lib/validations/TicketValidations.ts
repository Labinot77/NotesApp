"use client"
 
import { z } from "zod"

export const TicketValidation = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }).max(100),
  content: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).max(500),
  color: z.string().optional(),
  image: z.string().optional(),
})


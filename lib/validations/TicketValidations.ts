"use client"
 
import { z } from "zod"

export const TicketValidation = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }).max(15),
  content: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }).max(15),
})


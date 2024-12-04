"use client"
 
import { z } from "zod"

export const TicketCreationValidation = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }).max(100),
  content: z.string().optional(),
  // content: z.string().min(2, {
  //   message: "Description must be at least 2 characters.",
  // }).max(500),
  image: z.string().optional(),
})

export const TickerEditValidation = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }).max(100),
  // content: z.string().min(2, {
  //   message: "Description must be at least 2 characters.",
  // }).max(500),
  content: z.string().optional(),
  color: z.string().optional(),
  image: z.string().optional(),
  id: z.string().optional(),
})


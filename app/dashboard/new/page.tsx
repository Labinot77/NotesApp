"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TicketValidation } from "@/lib/validations/TicketValidations"
import { SubmitButton } from "@/components/Buttons"
import { CreateTicketData } from "@/lib/actions/TicketActions" // Import the server action
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function TicketCreationPage() { 
  const router = useRouter();
  const form = useForm<z.infer<typeof TicketValidation>>({
    resolver: zodResolver(TicketValidation),
    defaultValues: {
      title: "",
      content: "", 
    },
  })
  
  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof TicketValidation>) {
    try {
      await CreateTicketData(values)

      toast({
        title: "Note created",
        description: "Your ticket has been created successfully!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your ticket.",
      })
    }
  }


  
  return (
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} // Call the server action here
      className="flex flex-col gap-2 p-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton title="Create Note" pending={isSubmitting}/>
      </form>
    </Form>
  )
}

export default TicketCreationPage

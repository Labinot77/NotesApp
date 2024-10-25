"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { SubmitButton } from "./Buttons/Buttons"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

const PasswordPage = () => {
  const password = "123123"
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    }
  })
  const { isSubmitting } = form.formState

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.password === password) {
      document.cookie = "auth-token=true;"
      router.refresh()

      toast({
        title: "Success",
      })
    } else {
      form.reset();
      toast({
        title: "Error",
        description: "Incorrect password",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center justify-center h-screen">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormDescription>
                Enter the password to access the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton title="Submit" pending={isSubmitting} />
      </form>
    </Form>
  )
}

export default PasswordPage

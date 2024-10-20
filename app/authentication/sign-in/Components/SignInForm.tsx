"use client";

import React from "react";
import AuthButton from "@/components/Buttons/AuthButton";
import { useForm } from "react-hook-form";
import { UserLoginValidation } from "@/lib/validations/UserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/acitons/login";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const form = useForm<z.infer<typeof UserLoginValidation>>({
    resolver: zodResolver(UserLoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;
  const router = useRouter();

  // Make a sign in and sign up form to reduce errors.

  const onSubmit = async (values: z.infer<typeof UserLoginValidation>) => {
    try {

    const result = await login(values)

    if (result?.error) {
      toast({
        title: "Login Error",
        description: result.error,
      })
    } else {
      toast({
        title: result?.title,
        description: result?.description,
      })
      form.reset({ email: "", password: "" });

      if (result?.redirect) {
        router.push(result.redirect)
      }
    }
    } catch (error) {
      console.error("Login error:", error);
    }
  }


  return (
    <Form {...form}>
    <form 
    onSubmit={form.handleSubmit(onSubmit)}
    className="flex p-3 flex-col gap-2">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input className="px-2" placeholder="example@email.com" 
              type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input className="px-2" type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <AuthButton label="Sign In" pending={isSubmitting}/>
    </form>
  </Form>
  );
};

export default LoginForm;
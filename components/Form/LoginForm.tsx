"use client";

import React from "react";
import AuthButton from "../Buttons/AuthButton";
import { loginWithCreds } from "@/acitons/auth";
import { useForm } from "react-hook-form";
import { UserCreationValidation } from "@/lib/validations/UserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const LoginForm = () => {
  const form = useForm<z.infer<typeof UserCreationValidation>>({
    resolver: zodResolver(UserCreationValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Make a sign in and sign up form to reduce errors.
  // Fix Google Auth
  
  const onSubmit = async (values: z.infer<typeof UserCreationValidation>) => {
    try {
    await loginWithCreds(values)
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input className="px-2" placeholder="Dave" 
              type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
        <AuthButton />
    </form>
  </Form>
  );
};

export default LoginForm;
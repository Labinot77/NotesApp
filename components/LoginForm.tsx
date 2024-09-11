"use client";

import React from "react";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "@/acitons/auth";
import { useForm } from "react-hook-form";
import { UserCreationValidation } from "@/lib/validations/UserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const LoginForm = () => {
  const form = useForm<z.infer<typeof UserCreationValidation>>({
    resolver: zodResolver(UserCreationValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
  //   <Form {...form}>
  //   <form 
  //   // onSubmit={form.handleSubmit(loginWithCreds)} // Call the server action here onSubmit
  //   className="flex flex-col gap-2">
  //     <FormField
  //       control={form.control}
  //       name="email"
  //       render={({ field }) => (
  //         <FormItem>
  //           <FormLabel>Username</FormLabel>
  //           <FormControl>
  //             <Input placeholder="Username" 
  //             type="text" {...field} />
  //           </FormControl>
  //           <FormMessage />
  //         </FormItem>
  //       )}
  //     />
  //       <FormField
  //       control={form.control}
  //       name="password"
  //       render={({ field }) => (
  //         <FormItem>
  //           <FormLabel>password</FormLabel>
  //           <FormControl>
  //             <Input placeholder="email" 
  //              type="text" {...field} />
  //           </FormControl>
  //           <FormMessage />
  //         </FormItem>
  //       )}
  //     />
  //       <AuthButton />
  //   </form>
  // </Form>
    <div>
      <form 
      action={loginWithCreds} 
      className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-4">
          <AuthButton />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
"use client";

import { UserSettings } from "@/lib/validations/UserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SaveUserData } from "@/lib/actions/UserActions";
import { toast } from "@/hooks/use-toast";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/Buttons/Buttons";

interface Props {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

const SettingsForm = ({ id, name, email, image, role }: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(image);
  const form = useForm({
    resolver: zodResolver(UserSettings),
    defaultValues: {
      username: name || "",
      email: email || "",
      image: image || "",
    },
  });

  // Make it so the user can change the picture.

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof UserSettings>) {
    try {
      values.image = uploadedImageUrl;

      await SaveUserData(values);

      toast({
        title: "Settings Updated",
        description: "Your information has been updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your information.",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="w-full">
        <Avatar className="mx-auto rounded-full w-[8rem] h-[8rem] relative group">
          <AvatarImage src={uploadedImageUrl} />

          {/* Dimming Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full"></div> 

          <UploadButton
            onClientUploadComplete={(res) => {
              setUploadedImageUrl(res[0].url);
            }}
            endpoint="imageUploader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit ut-allowed-content:hidden ut-button:bg-slate-200 ut-button:hover:bg-slate-300 ut-button:text-neutral-800 ut-uploading:opacity-100 ut-button:active:border-neutral-500 ut-button:transition-colors opacity-0 group-hover:opacity-100 duration-500 ut-button:w-[5rem] ut-button:h-[1.5rem] ut-button:text-xs z-10"
          />

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="text" {...field} />
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
                <Input disabled placeholder="email" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-center text-neutral-400 opacity-45">Role: {role}</p>
        <p className="text-center text-neutral-400">Account Id: {id}</p>
        <SubmitButton pending={isSubmitting} title="Save Changes" />
      </form>
    </Form>
  );
};

export default SettingsForm;

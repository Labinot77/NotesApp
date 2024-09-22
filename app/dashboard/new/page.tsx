"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TicketCreationValidation } from "@/lib/validations/TicketValidations";
import { CreateTicketData } from "@/lib/actions/TicketActions";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/Buttons/Buttons";
import { TitleColors } from "@/constants";
import { useState } from "react";
import { capitalizeLetter } from "@/lib/Miscellaneous";
import ImageUpload from "@/components/ImageUpload";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function TicketCreation() {
  const session = useSession();
  if (!session?.data?.user?.id) return redirect("/authentication/sign-in?callbackUrl=/dashboard/new");


  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const form = useForm<z.infer<typeof TicketCreationValidation>>({
    resolver: zodResolver(TicketCreationValidation),
    defaultValues: {
      title: "",
      content: "",
      color: "",
      background: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof TicketCreationValidation>) {
    try {
      const { color, backgroundColor } = TitleColors[Math.floor(Math.random() * TitleColors.length)];
      values.color = color;
      values.background = backgroundColor;
      values.content = capitalizeLetter(values.content);
      values.title = capitalizeLetter(values.title);

      const ticketData = {
        ...values,
        image: uploadedImageUrl,
      };

      await CreateTicketData(ticketData);

      toast({
        title: "Note created",
        description: "Your ticket has been created successfully!",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your ticket.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-16 flex flex-col gap-2 p-2"
      >
    <ImageUpload uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
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
                <Textarea
                  className="resize-none h-44"
                  placeholder="Enter description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton title="Create Note" pending={isSubmitting} />
      </form>
    </Form>
  );
}

export default TicketCreation;

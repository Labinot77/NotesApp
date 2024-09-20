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
import { useRouter } from "next/navigation";
import { RemoveImageButton, SubmitButton } from "@/components/Buttons/Buttons";
import { TitleColors } from "@/constants";
import Uploader from "@/components/Upload";
import { useState } from "react";
import { capitalizeLetter } from "@/lib/Miscellaneous";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";

export function TicketCreationPage() {
  const router = useRouter();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
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
      const { color, backgroundColor } =
        TitleColors[Math.floor(Math.random() * TitleColors.length)];
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

      router.push("/dashboard");
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
        onSubmit={form.handleSubmit(onSubmit)} // Call the server action here
        className="px-16 flex flex-col gap-2 p-2"
      >
        <div
          className={`h-[20vh] mb-2 relative bg-neutral-300 w-full rounded-md group`}
        >
          <h1 className="text-6xl absolute left-[32%] top-[32%] text-neutral-400 opacity-35">Add an image</h1>
          {uploadedImageUrl && (
            <Image
              src={uploadedImageUrl as string}
              alt="Note Image"
              className="object-cover rounded-md transition-opacity duration-200"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
              fill
            />
          )}

          {uploadedImageUrl && (
              <RemoveImageButton  classes="absolute bottom-5 left-5 w-fit opacity-0 group-hover:opacity-100" event={() => setUploadedImageUrl("")}  />
          )}
          <UploadButton
            onClientUploadComplete={(res) => {
              setUploadedImageUrl(res[0].url);
            }}
            endpoint="imageUploader"
            className="absolute bottom-5 right-5 w-fit ut-allowed-content:hidden ut-button:bg-slate-200 ut-button:hover:bg-slate-300 ut-button:text-neutral-800 ut-button:active:border-neutral-500 ut-button:transition-colors opacity-0 group-hover:opacity-100 duration-500 ut-button:w-[7rem] ut-button:h-[2rem] ut-button:text-sm"
          />
        </div>
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

export default TicketCreationPage;

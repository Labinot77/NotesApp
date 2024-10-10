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
import { toast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/Buttons/Buttons";
import { useState } from "react";
import { capitalizeLetter } from "@/lib/Miscellaneous";
import ImageUpload from "@/app/dashboard/new/Components/ImageUpload";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Block } from "@blocknote/core";

const CreateNoteForm = () => {  
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [blocks, setBlocks] = useState<Block[]>([]);


  const form = useForm<z.infer<typeof TicketCreationValidation>>({
    resolver: zodResolver(TicketCreationValidation),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof TicketCreationValidation>) {
    try {
      values.content = capitalizeLetter(values.content!);
      values.title = capitalizeLetter(values.title);
      values.content = JSON.stringify(blocks);

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
  const { isSubmitting } = form.formState;

  const Editor = useMemo(
    () => dynamic(() => import("../Components/Editor"), { ssr: false }),
    []);


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
            <FormItem className="">
              <FormControl>
                <Input className="h-full text-4xl text-neutral-900 dark:text-neutral-500 font-bold placeholder:text-neutral-700" placeholder="Untitled" {...field} /> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Editor onChange={(updatedBlocks) => setBlocks(updatedBlocks)}/>
        <SubmitButton title="Create Note" pending={isSubmitting} />
      </form>
    </Form>
  );
}

export default CreateNoteForm
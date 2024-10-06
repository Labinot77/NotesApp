"use client"

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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TickerEditValidation } from '@/lib/validations/TicketValidations'
import { SubmitButton, TrashDelete } from '@/components/Buttons/Buttons'
import { toast } from '@/hooks/use-toast'
import { deleteNote, SaveEditedNote } from '@/lib/actions/TicketActions'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import { MoveLeft } from "lucide-react"
import Link from "next/link"

interface Props {
  id: string
  content: string
  title: string
  image: string | null
}

const EditForm = ({ id, content, title, image }: Props) => {
  const [actionType, setActionType] = useState<'save' | 'delete'>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(image as string);
  const form = useForm<z.infer<typeof TickerEditValidation>>({
    resolver: zodResolver(TickerEditValidation),
    defaultValues: {
      title: title,
      content: content,
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof TickerEditValidation>) {
    values.image = uploadedImageUrl

    try {

      if (actionType === 'save') {
      const formData = {
        ...values,
        id: id
      }

      await SaveEditedNote(formData);

      toast({
        title: 'Note Updated',
        description: 'Your note has been updated successfully!',
      });
      
    } else if (actionType === 'delete') {

      await deleteNote(id);
      toast({
        title: 'Note Deleted',
        description: 'Your note has been deleted successfully!',
      });
      }

    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error updating your note.',
      });
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="px-16 flex flex-col">
      <div className="flex justify-between">
        <Link href={`/dashboard`}>
            <MoveLeft className="text-neutral-500 justify-end" />
        </Link>
          <h1 className='flex justify-end text-sm text-neutral-400 opacity-50'>ID: {id}</h1>
      </div>
        <ImageUpload uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder={title} {...field} />
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
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea className='resize-none h-44' placeholder={content} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton title="Save Changes" pending={isSubmitting} onClick={() => setActionType('save')} />
      <TrashDelete title='Delete Note' pending={isSubmitting}  onClick={() => setActionType('delete')} />
    </form>
  </Form>
  )
}

export default EditForm
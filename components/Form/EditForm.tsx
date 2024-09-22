"use client"

import Image from 'next/image'
import { Button } from "@/components/ui/button"
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
import { SubmitButton, TrashDelete } from '../Buttons/Buttons'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { SaveEditedNote } from '@/lib/actions/TicketActions'
import { Textarea } from '../ui/textarea'
import { Separator } from '../ui/separator'
import Uploader from '../Upload'
import { useState } from 'react'
import { UploadButton } from '@/utils/uploadthing'
import { ImageUp } from 'lucide-react'
import ImageUpload from '../ImageUpload'

interface Props {
  id: string
  content: string
  title: string
  image: string | null
}

const EditForm = ({ id, content, title, image }: Props) => {
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
      const formData = {
        ...values,
        id: id
      }

      await SaveEditedNote(formData);

      toast({
        title: 'Note Updated',
        description: 'Your note has been updated successfully!',
      });
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
      <h1 className='flex justify-end text-sm text-neutral-400 opacity-50'>ID: {id}</h1>
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
      <SubmitButton title="Save Changes" pending={isSubmitting} />
    <TrashDelete noteId={id} pending={isSubmitting} />
    </form>
  </Form>
  )
}

export default EditForm
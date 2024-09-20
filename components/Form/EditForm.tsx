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

      console.log(formData)
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="px-16 flex flex-col justify-center items-center">
      <div className={`h-[20vh] mb-2 relative bg-neutral-300 w-full rounded-md group`}> 
        {uploadedImageUrl && (
          <Image 
          src={uploadedImageUrl} 
          alt="Note Image" 
          className="object-cover rounded-md transition-opacity duration-200"
          onLoadingComplete={(image) => image.classList.remove("opacity-0")} 
          fill />
        )}
          <UploadButton onClientUploadComplete={(res) => { 
            setUploadedImageUrl(res[0].url) 
            }}
             endpoint='imageUploader' 
             className='absolute bottom-5 right-5 w-fit ut-allowed-content:hidden ut-button:bg-slate-200 ut-button:hover:bg-slate-300 ut-button:text-neutral-800 ut-button:transition-colors opacity-0 group-hover:opacity-100 duration-500 ut-button:w-[7rem] ut-button:h-[2rem] ut-button:text-sm' />
        </div>
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
              <Textarea placeholder={content} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton title="Save Changes" pending={isSubmitting} />
    </form>
    <TrashDelete noteId={id} pending={isSubmitting} />
  </Form>
  )
}

export default EditForm
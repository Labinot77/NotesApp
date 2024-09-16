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

interface Props {
  id: string
  content: string
  title: string
  image: string | null
}

const EditForm = ({ id, content, title, image }: Props) => {
  const form = useForm<z.infer<typeof TickerEditValidation>>({
    resolver: zodResolver(TickerEditValidation),
    defaultValues: {
      title: title,
      content: content,
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof TickerEditValidation>) {
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
      {image ? (
        <>
      <Image 
      src={image as string} 
      alt="Note Image" 
      className="object-cover max-h-36 rounded-md transition-opacity duration-200 opacity-0 p-1"
      onLoadingComplete={(image) => image.classList.remove("opacity-0")} 
      width={400} height={50} />
      <Separator />
        </>
      ) : null }
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
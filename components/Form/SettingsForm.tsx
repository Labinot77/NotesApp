"use client"

import { UserSettings } from '@/lib/validations/UserValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form'
import { Input } from '../ui/input'
import { SubmitButton } from '../Buttons'
import { SaveUserData } from '@/lib/actions/UserActions'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Props {
    name: string
    email: string
    image: string 
    role: string  
}


const SettingsForm = ({ name, email, image, role}: Props) => {
  const form = useForm ({
    resolver: zodResolver(UserSettings),
    defaultValues: {
      username: name || "",
      email: email || "",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof UserSettings>) {
    try {
      await SaveUserData(values)

      toast({
        title: "Settings Updated",
        description: "Your information has been updated successfully!",
      })

    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your information.",
      })
    }
  }


  return (
    <Form {...form}>
      <div className='w-full'>
      <Image className='mx-auto rounded-full border-dashed hover:border-2 border-gray-400 transition-all' src={image as string} alt="Profile Image" width={100} height={100} />
      </div>
    <form 
    onSubmit={form.handleSubmit(onSubmit)}
    className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Username" 
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
              <Input disabled placeholder="email" 
               type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton pending={isSubmitting} title='Save Changes' />
    </form>
  </Form>
  )
}

export default SettingsForm
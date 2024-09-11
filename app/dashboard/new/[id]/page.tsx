import { auth } from '@/auth'
import { EditUserNote } from '@/lib/actions/TicketActions'
import { redirect } from 'next/navigation'
import React from 'react'

async function DynamicRoute({params}: {params: { id: string }}) {

  const session = await auth()

  if (!session?.user) {
    redirect("/api/sign-in?callback/Url=/dashboard/new")
  }

  const data = await EditUserNote(params.id as string)

  return (
    <div>{data?.title}</div>
  )
}

export default DynamicRoute
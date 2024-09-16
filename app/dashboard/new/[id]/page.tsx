import { auth } from '@/auth'
import { EditUserNote } from '@/lib/actions/TicketActions'
import { redirect } from 'next/navigation'
import EditForm from '@/components/Form/EditForm'

async function DynamicRoute({params}: {params: { id: string }}) {
  const session = await auth()
  
  
  if (!session?.user) {
    redirect("/api/sign-in?callback/Url=/dashboard/new")
  }
  
  const data = await EditUserNote(params.id as string)

  if (!data) {
    return <p>Note not found</p>;
  }

  return (
   <EditForm {...data} />
  )
}

export default DynamicRoute
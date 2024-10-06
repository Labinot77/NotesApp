import { auth } from '@/auth'
import { EditUserNote } from '@/lib/actions/TicketActions'
import { redirect } from 'next/navigation'
import EditForm from './Components/EditForm'
import { getUserSession } from '@/lib/actions/UserActions'

async function DynamicRoute({params}: {params: { id: string }}) {
  const session = await getUserSession()
  if (!session?.id) {
    redirect("/api/sign-in?callback/Url=/dashboard/new")
  }
  
  const data = await EditUserNote(params.id as string)

  if (!data) {
    return <div>Error: Note not found or failed to fetch</div>;
  }

  return (
   <EditForm
   id={data.id} 
   title={data.title}
   content={data.content}
   image={data.image}
    />
  )
}

export default DynamicRoute
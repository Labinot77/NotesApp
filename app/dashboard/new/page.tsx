import { getUserSession } from '@/lib/actions/UserActions'
import CreateNoteForm from './Components/CreateNoteForm'
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getUserSession();
  if (!session?.id) {
    return redirect("/authentication/sign-in?callbackUrl=/dashboard/new");
  }

  return (
    <CreateNoteForm />
  )
}

export default page
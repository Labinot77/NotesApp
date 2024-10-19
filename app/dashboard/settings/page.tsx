
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SettingsForm from './Components/SettingsForm'
import { getUserData } from '@/lib/actions/UserActions'
import Logout from '@/components/Logout'
import { ModeToggle } from './Components/ModeToggle'

const page = async () => {
  const session = await auth()
  
  if (!session?.user) redirect('/authentication/sign-in?callback/Url=/dashboard/settings')
    
  const data = await getUserData(session.user.id as string)

  if (!data) {
    return redirect('/authentication/sign-in?callback/Url=/dashboard/settings')
  }
  
  return (
    <main className='p-2 h-full'>
      <div className='w-full flex gap-5 justify-end'>
        <ModeToggle />
        <Logout />
      </div>
      
      <SettingsForm
      id={data.id}
      name={data.name}
      email={data.email}
      image={data.image as string}
      role={data.role}
       />
    </main>

  )
}

export default page
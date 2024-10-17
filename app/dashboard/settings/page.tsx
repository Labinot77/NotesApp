
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
  return (
    <main className='p-2 h-full'>
      <div className='w-full flex gap-5 justify-end'>
        <ModeToggle />
        <Logout />
      </div>
      {/* @ts-expect-error */}
      <SettingsForm {...data} />
    </main>

  )
}

export default page
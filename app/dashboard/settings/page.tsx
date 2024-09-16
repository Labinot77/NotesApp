
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/Form/SettingsForm'
import { getUserData } from '@/lib/actions/UserActions'
import Logout from '@/components/Logout'

const page = async () => {
  const session = await auth()
  
  if (!session?.user) redirect('/sign-in?callback/Url=/dashboard/settings')
    
    const data = await getUserData(session.user.id as string)
    
  return (
    <main className='p-2 h-full'>
      <div className='w-full flex justify-end'>
      <Logout />
      </div>
      {/* @ts-ignore  */}
      <SettingsForm {...data} />
    </main>

  )
}

export default page

import { LoaderCircle } from 'lucide-react'

const loading = () => {
  return (
    <main className='w-full flex justify-center items-center'>
      <LoaderCircle size={32} className='animate-spin text-neutral-700 dark:text-white' />
    </main>
  )
}

export default loading
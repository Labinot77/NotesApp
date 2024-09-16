
import { LoaderCircle } from 'lucide-react'

const loading = () => {
  return (
    <main className='h-[90%] w-full flex justify-center items-center'>
      <LoaderCircle size={28} className='animate-spin text-white' />
    </main>
  )
}

export default loading
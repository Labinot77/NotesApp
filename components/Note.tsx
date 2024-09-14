"use client"

import { TrashDelete } from './Buttons/Buttons'
import Link from 'next/link'
import { Ellipsis, PencilLine } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import Dots from './Dots'
import { TitleColors } from '@/constants'

interface Props {
  id: string
  title: string
  content: string
  createdAt: Date
}

const Note = ({ id, title, content, createdAt }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <main key={id} className="p-1 w-full rounded-md bg-gray-800/50 flex justify-between shadow-xl">
      <div className='w-full'>
          <h2 className='bg-yellow-600 text-base rounded-md p-1'>{title}</h2>
          <p className='text-sm w-full p-2 max-h-48 overflow-hidden'>{content}</p>
          <div className='w-full h-[2px] bg-gray-700/50 rounded-full'/>
          <div className='flex justify-between items-center mt-1'>
        <small className="px-2 ">
          {new Date(createdAt).toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        }).replace("", '')}
        </small>
        <Dots NoteId={id} />
        </div>
      </div>

      {/* <div className='flex gap-2 justify-center items-center'>
        <TrashDelete noteId={id} /> 
        
         <Button variant={"destructive"} size="icon">
          <Link href={`/dashboard/new/${id}`}>
            <PencilLine className="h-4 w-4" />
          </Link>
        </Button>
      </div> */}
    </main>
  )
}

export default Note

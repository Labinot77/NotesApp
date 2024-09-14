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
  color: string
  createdAt: Date
}

const Note = ({ id, title, content, color, createdAt }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }


  return (
    <main key={id} className="p-1 w-full rounded-md bg-gray-800/50 flex justify-between shadow-2xl">
      <div className='w-full'>
          <h2 className="text-base rounded-md p-1" style={{backgroundColor: color}}>{title}</h2>
          <p className={`note-text ${isExpanded ? "expanded" : ""}`} onClick={toggleExpand}>{content}</p>
          <div className='w-full h-[2px] bg-gray-700/50 rounded-full'/>
          <div className='flex justify-between items-center mt-1'>
        <small className="px-2 ">
          {new Date(createdAt).toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
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

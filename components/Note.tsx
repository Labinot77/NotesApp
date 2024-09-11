"use client"

import { TrashDelete } from './Buttons'
import Link from 'next/link'
import { PencilLine } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
  id: string
  title: string
  content: string
  createdAt: Date
}

const Note = ({ id, title, content, createdAt }: Props) => {
  
  return (
    <main key={id} className="p-2 w-full rounded-3xl bg-gray-800/50 flex justify-between">
      <div className='p-2'>
        <h2>{title}</h2>
        <p>{content}</p>
        <small>Created at: {new Date(createdAt).toLocaleDateString()}</small>
      </div>

      <div className='flex gap-2 justify-center items-center'>
        <TrashDelete noteId={id} />
        
        <Button variant={"destructive"} size="icon">
          <Link href={`/dashboard/new/${id}`}>
            <PencilLine className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  )
}

export default Note

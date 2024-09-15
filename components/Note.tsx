"use client"

import { useState } from 'react'
import Dots from './Dots'
import Image from 'next/image'

interface Props {
  id: string
  title: string
  content: string
  color: string
  image: string | null
  createdAt: Date
}

const Note = ({ id, title, content, color, image, createdAt }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <main key={id} className="p-1 w-full rounded-md bg-gray-800/50 flex justify-between shadow-2xl">
      <div className='w-full'>
          <h2 className="text-base rounded-md p-1" style={{backgroundColor: color}}>{title}</h2>
          {image ? (
            // <div className='w-full h-[rem] rounded-md'>
              <Image 
              src={image} 
              alt='Note Image' 
              className='object-contain rounded-md transition-opacity duration-200 opacity-0' 
              width={100} height={100} 
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
              />
            // </div>
          ): null }
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
    </main>
  )
}

export default Note

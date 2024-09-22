"use client"

import { useState } from 'react'
import Image from 'next/image'
import { EditButton } from './Buttons/Buttons'

interface Props {
  id: string
  title: string
  content: string
  color: string
  background: string
  image: string | null
  createdAt: Date
}

const Note = ({ id, title, content, color, background, image, createdAt }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isZoomed, setIsZoomed] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
<main key={id} className="p-1 w-full rounded-md bg-gray-800/30 flex flex-col shadow-2xl">
  <div className='w-full'>
      <h2 className="text-lg font-semibold rounded-md p-1" style={{ backgroundColor: background, color: color }}>{title}</h2>
      {image ? (
        <div className='h-[15vh] relative'>
          <Image 
            src={image} 
            alt='Note Image' 
            className='object-cover object-center rounded-md transition-opacity duration-200 opacity-0 p-1' 
            fill
            priority
            onLoad={(e) => {
              const image = e.currentTarget as HTMLImageElement;
              image.classList.remove("opacity-0")
            }}
          />
        </div>
      ) : null }
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
        <EditButton title='Edit' pending={false} id={id} />
      </div>
  </div>
</main>
  )
}

export default Note

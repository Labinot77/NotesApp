"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ImageModal } from '@/app/dashboard/components/ImageModal'

interface Props {
  title: string
  content: string
  image: string | null
  id: string
  createdAt: Date
}


const Note = ({ id, title, content, image, createdAt }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
<main key={id} className="p-1 w-full rounded-md bg-neutral-300 dark:bg-gray-800/30 flex flex-col shadow-2xl">
  <div className='w-full'>
      <h2 className="text-xl font-semibold p-1 text-primary">{title}</h2>
      {image ? (
        <div className='h-[15vh] relative'>
          <ImageModal src={image || ""} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <Image 
            onClick={() => setIsModalOpen(true)}
            src={image}
            alt='Note Image' 
            className='object-cover object-center rounded-md transition-opacity duration-200 opacity-0 p-1 cursor-pointer' 
            fill
            priority
            onLoad={(e) => {
              const image = e.currentTarget as HTMLImageElement;
              image.classList.remove("opacity-0")
            }}
          />
        </div>
      ) : null }
      {/* <Editor initialContent={content}/> */}
      {/* <p className={`note-text ${isExpanded ? "expanded" : ""}`} onClick={toggleExpand}>{JSON.parse(content)}</p> */}
      <div className='w-full h-[2px] bg-gray-700/50 rounded-full'/>
      <div className='flex justify-between items-center mt-1'>
        <small className="px-2 ">
          {new Date(createdAt).toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </small>
        {/* <EditButton title='Edit' pending={false} id={id} /> */}
      </div>
  </div>
</main>
  )
}

export default Note

"use client"

import { useRef } from "react"

const NoteRef = () => {
  const refBottom = useRef<HTMLDivElement>(null);

  return (
    <div className="pt-24" ref={refBottom}/>
  )
}

export default NoteRef
"use client"

import { Button } from "@/components/ui/button"
import { deleteNote } from "@/lib/actions/TicketActions"
import { ReloadIcon } from "@radix-ui/react-icons"
import { PenLine, Trash } from "lucide-react"
import Link from "next/link"


interface Props {
  title: string;
  pending: boolean
}


export const SubmitButton = ({ title, pending }: Props ) => {
  return (
    <>  
    {pending ? (
          <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Saving
        </Button>
    ): (
      <Button type="submit">{title}</Button>
    )}
    </>
  )
}

export const EditButton = ({ title, pending, id }: { title: string; pending: boolean; id: string }) => {
  // const {pending} = useFormStatus()
  return (
    <>  
    {pending ? (
          <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Saving
        </Button>
    ): (
      <Link href={`/dashboard/new/${id}`}>
        <Button>
         <PenLine size={15}/>
        </Button>
        </Link>
      )}
    </>
  )
}

export const TrashDelete = ({noteId, pending}: {noteId: string, pending?: boolean}) => {
  return (
    <>
      {pending ? (
        <Button variant={"destructive"} size="icon" disabled>
             <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"destructive"} size="icon" type="submit" 
        onClick={() => deleteNote(noteId)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}


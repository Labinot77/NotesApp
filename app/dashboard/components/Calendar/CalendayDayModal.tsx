"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Note } from "@prisma/client";
import Link from "next/link";
import { BookImage, NotebookText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
  notes: Note[];
}

const CalendayDayModal = ({ children, notes }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (notes.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={(prev) => setIsOpen(prev)}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>No Notes</DialogTitle>
            <DialogDescription>
              You dont have any notes for this day
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <Link href={"/dashboard/new"}>
              <Button className="mt-2">Create Note</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={(prev) => setIsOpen(prev)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Notes</DialogTitle>
          <DialogDescription>Your notes for this day</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-3">
            {notes.map((note) => {
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={`/dashboard/new/${note.id}`}>
                        <div className="flex items-center gap-4 hover:bg-primary-foreground group p-1 rounded relative">
                          {note.image && (
                            <div className="absolute top-4 -right-3 p-1 group-hover:bg-primary-foreground group-hover:rounded-md">
                              <BookImage size={17} />
                            </div>
                          )}
                          <NotebookText />
                          <div>
                            <h1>{note.title}</h1>
                            <small>{note.createdAt.toLocaleString()}</small>
                          </div>
                        </div>
                      </Link>
                    </TooltipTrigger>
                    {note.image && (
                      <TooltipContent>
                        <Image
                          priority
                          src={note.image}
                          alt="Image"
                          width={150}
                          height={100} />
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendayDayModal;

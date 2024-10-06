
"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { TickerEditValidation, TicketCreationValidation } from "../validations/TicketValidations";
import { z } from "zod";
import { redirect } from "next/navigation";


export async function CreateTicketData(values: z.infer<typeof TicketCreationValidation>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  await db.note.create({
    data: {
      userId: session.user?.id,
      title: values.title,
      content: values.content,
      color: values.color,
      background: values.background,
      image: values.image,
    }
  });
  return redirect("/dashboard");
}

export async function FindUserTickets(userId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Notes: {
        select: {
          title: true,
          content: true,
          image: true,
          id: true,
          color: true,
          background: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
}

export async function EditUserNote(NoteId: string) {
  try {
    const data = await db.note.findUnique({
      where: {
        id: NoteId,
      },
      select: {
        title: true,
        content: true,
        image: true,
        id: true,
        createdAt: true,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

export async function SaveEditedNote(values: z.infer<typeof TickerEditValidation>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  await db.note.update({
    where: {
      id: values.id
    },
    data: {
      title: values.title,
      content: values.content,
      image: values.image,
    },
  });


  return redirect("/dashboard");
}


export const deleteNote = async (id: string) => {
  await db.note.delete({
    where: {
      id: id,
    },
  })

  redirect("/dashboard")
}

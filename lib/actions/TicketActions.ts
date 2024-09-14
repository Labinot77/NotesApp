
"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { TicketValidation } from "../validations/TicketValidations";
import { z } from "zod";
import { revalidatePath } from "next/cache";


export async function CreateTicketData(values: z.infer<typeof TicketValidation>) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  await db.note.create({
    data: {
      userId: session.user?.id,
      title: values.title,
      content: values.content,
      // noteData: {
      //   noteColor: "",
      // },
    }
  });
  return revalidatePath("/dashboard");
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
          id: true,
          // noteData: true,
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
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authorized");
  }

  const data = await db.note.findUnique({
    where: {
      id: NoteId,
    },
    select: {
          title: true,
          content: true,
          id: true,
          createdAt: true,
    },
  });

  return data;
}

export const deleteNote = async (id: string) => {
  await db.note.delete({
    where: {
      id: id,
    },
  })

  revalidatePath("/dashboard")
}

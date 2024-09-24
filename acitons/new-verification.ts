"use server"

import { getVerificationTokenByToken } from "@/data/verification-tokens";
import { db } from "@/db";
import { getUserEmail } from "@/lib/actions/UserActions";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserEmail(existingToken.identifier)

  if (!existingUser) {  
    return { error: "User does not exist" };
  }

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date(),
      // email: existingToken.identifier,
    },
  })

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })  

  return { success: 'Email verified! Login to continue' };
}
import { getVerificationTokenByEmail } from "@/data/verification-tokens";
import { db } from "@/db";

export const generateVerficicationToken = async (identifier: string) => {
  const token = crypto.randomUUID();
  const expiryDate = new Date(Date.now() + 1000 * 60 * 15); // 15 MIN

  const existingToken = await getVerificationTokenByEmail(identifier);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      }
    })
  }

  // Create new token
  const verificationToken = await db.verificationToken.create({
    data: {
      identifier,
      token,
      expires: expiryDate,
    },
  });

  return verificationToken;
}
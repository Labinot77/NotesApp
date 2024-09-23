import { db } from "@/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

// identifier is email duh
export const getVerificationTokenByEmail = async (identifier: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

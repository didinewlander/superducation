'use server'
import db from "@/lib/db";

export const getUserIdByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  const userId = user?.id;
  return userId;
};

export const getUser = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
};

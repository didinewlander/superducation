import { db } from "./db";

export async function findRole(email: string) {
  const role = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  return role?.role?.name;
}

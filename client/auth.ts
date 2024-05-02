import NextAuth, { Session } from "next-auth";
import google from "next-auth/providers/google";
import { getUserIdByEmail } from "./actions/GetUser";
import { db } from "./lib/db";

declare module "next-auth" {
  interface Session {
    info: {
      userId?: string;
      role?: string;
    };
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const userId = await getUserIdByEmail(session.user?.email ?? "");
      const role = await db.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
      });

      const newSession = {
        ...session,
        info: {
          userId,
          role: role?.role?.name,
        },
      };

      return Promise.resolve(newSession);
    },
  },
});

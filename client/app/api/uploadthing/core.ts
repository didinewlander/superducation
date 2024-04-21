import { createUploadthing, type FileRouter } from "uploadthing/next";
import { findRole } from "@/lib/roles";
import { getUserIdByEmail } from "@/actions/GetUserByEmail";
import { auth } from "@/auth";

const f = createUploadthing();

const handleAuth = async () => {
  const session = await auth();
  const userId = await getUserIdByEmail(session?.user?.email ?? "");
  const role = findRole(session?.user?.email);

  const isAuthorized = role === "teacher" || role === "institution";

  if (!userId || !isAuthorized) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

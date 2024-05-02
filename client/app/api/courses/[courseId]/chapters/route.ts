import { NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/db'

import { auth } from "@/auth";
import { getUserIdByEmail } from "@/actions/GetUser";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { title } = await req.json();
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("no email", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");

    if (!userId  || (session.info.role !== "teacher" && session.info.role !== "both")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId },
    });

    if (!courseOwner) {
      console.log("NO COURSE OWNER");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: { courseId: params.courseId },
      orderBy: { position: "desc" },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const newChapter = await db.chapter.create({
      data: { title, courseId: params.courseId, position: newPosition },
    });

    return NextResponse.json(newChapter);
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

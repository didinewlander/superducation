import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findRole } from "@/lib/roles";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserIdByEmail } from "@/actions/GetUserByEmail";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { title } = await req.json();
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const userId = await getUserIdByEmail(session.user?.email ?? "");

    if (!userId || findRole(userId) !== "teacher") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId },
    });

    if (!courseOwner) {
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

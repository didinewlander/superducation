import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserIdByEmail } from "@/actions/GetUser";
import { auth } from "@/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const session = await auth();

    if (!session || session.info.role !== "teacher" && session.info.role !== "both") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { isCompleted } = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: { userId_chapterId: { userId, chapterId: params.chapterId } },
      update: { isCompleted },
      create: { userId, chapterId: params.chapterId, isCompleted },
    });

    return NextResponse.json(userProgress);
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

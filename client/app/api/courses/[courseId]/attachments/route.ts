import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findRole } from "@/lib/roles";
import { auth } from "@/auth";
import { getUserIdByEmail } from "@/actions/GetUserByEmail";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();
    const { url } = await request.json();
    if (!session || findRole(session.user?.email) !== "teacher") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        createdById: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

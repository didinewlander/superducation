import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findRole } from "@/lib/roles";
import { getUserIdByEmail } from "@/actions/GetUser";
import { auth } from "@/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { courseId, attachmentId } = params;
    const session = await auth();

    if (!session || findRole(session.user?.email) !== "teacher") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, createdById: userId },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: { courseId, id: attachmentId },
    });

    return NextResponse.json(attachment);
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { db } from '@/lib/db'

import { getUserIdByEmail } from "@/actions/GetUser";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const { title } = await request.json();

    if (!session?.user?.email) {
      return new NextResponse("no email", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        title,
        createdById: userId,
        description: "",
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[CREATE_COURSE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();
    const { courseId } = params;
    const values = await req.json();

    if (!session || session.info.role !== "teacher" && session.info.role !== "both") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");

    const course = await db.course.update({
      where: {
        id: courseId,
        createdById: userId,
      },
      data: {
        title: values?.title,
        description: values?.description,
        imageUrl: values?.imageUrl,
        categoryId: values?.categoryId,
        priceInCents: values?.price,
        attachments: values?.attachments,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();

    if (!session || session.info.role !== "teacher" && session.info.role !== "both") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");

    const course = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId },
      include: {
        chapters: { include: { muxData: true } },
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    /** Removing mux data for all chapters */
    for (const chapter of course.chapters) {
      if (chapter.muxData) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: { id: params.courseId },
    });

    return NextResponse.json(deletedCourse);
  } catch {
    return new NextResponse("Internal server exception", { status: 500 });
  }
}

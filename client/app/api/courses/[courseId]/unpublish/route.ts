import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'


import { getUserIdByEmail } from '@/actions/GetUser';
import { auth } from '@/auth';

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const session = await auth();

    if (!session || session.info.role !== "teacher" && session.info.role !== "both") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user?.email ?? "");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, createdById: userId },
      include: { chapters: { include: { muxData: true } } },
    })

    if (!course) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const unpublishedCourse = await db.course.update({ where: { id: params.courseId }, data: { isPublished: false } })

    return NextResponse.json(unpublishedCourse)
  } catch {
    return new NextResponse('Internal server error', { status: 500 })
  }
}

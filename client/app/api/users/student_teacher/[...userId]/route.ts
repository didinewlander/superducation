import { auth } from "@/auth";
import { db } from '@/lib/db'

import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const id = userId[0];
    const {
      currentInstituteId,
      enrolledYear,
      expectedGraduationYear,
      teachAtInstituteId,
    } = await req.json();
    const session = await auth();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const user = await db.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const student = await db.student.findUnique({
      where: { userId: id },
    });
    const teacher = await db.teacher.findUnique({
      where: { userId: id },
    });
   
    const role = await db.userRole.findUnique({
      where: { id: user.roleId ?? "" },
    });
    if (!role || role.name !== "both") {
      return new NextResponse("Unauthorized: Incorrect Role", { status: 401 });
    }

    // Updating the student record
    const updatedStudent = await db.student.update({
      where: { userId: id },
      data: {
        instituteId: currentInstituteId || undefined,
        enrolledYear: enrolledYear || undefined,
        expectedGraduationYear: expectedGraduationYear || undefined,
      },
    });

    // Updating the teacher record
    const updatedTeacher = await db.teacher.update({
      where: { userId: id },
      data: {
        instituteId: teachAtInstituteId || undefined,
      },
    });

    // Creating a response that includes updates from both student and teacher updates
    const response = {
      userId: id,
      studentUpdates: {
        enrolledYear: updatedStudent.enrolledYear,
        expectedGraduationYear: updatedStudent.expectedGraduationYear,
        instituteId: updatedStudent.instituteId,
      },
      teacherUpdates: {
        instituteId: updatedTeacher.instituteId,
      },
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal server error", {
      status: 500,
      statusText: "Error updating user information",
    });
  }
}

import { db } from "@/lib/db";
import { Teacher, User, Institute, Course, Appointment } from "@prisma/client";

export type TeacherWithDetails = Teacher & {
  user: User | null;
  institution: Institute | null;
  courses: Course[];
  appointments: Appointment[];
};

type GetTeacher = {
  teacherId: string;
};

export const getTeacher = async ({
  teacherId,
}: GetTeacher): Promise<TeacherWithDetails | null> => {
  try {
    const teacher = await db.teacher.findUnique({
      where: {
        id: teacherId,
      },
      include: {
        user: true,
        institution: true,
        courses: {
          where: {
            isPublished: true,
          },
          include: {
            category: true,
          },
        },
        appointments: {
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

    if (!teacher) {
      console.log("[GET_TEACHER] Teacher not found");
      return null;
    }

    return {
      ...teacher,
      institution: teacher.institution || null,
    };
  } catch (error) {
    console.log("[GET_TEACHER]", error);
    return null;
  }
};

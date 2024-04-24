import db from "@/lib/db";
import { Teacher, User, Institute, Course, Appointment } from "@prisma/client";
import { Teacher as TeacherType } from "@/app/(application)/(routes)/teachers/_components/columns";
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

export const getAllTeachers = async (): Promise<TeacherType[] | null> => {
  try {
    const teachers = await db.teacher.findMany({
      include: {
        user: true,
        institution: true,
        courses: {
          where: {
            isPublished: true,
          },
          select: {
            title: true,
            id: true,
          },
        },
        // Adjust this part based on your schema
        // Here it assumes `suggestions` is a related model which needs to be counted
        suggestions: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const transformedTeachers: TeacherType[] = teachers.map(teacher => ({
      id: teacher.id,
      name: teacher.user?.name || "No Name",  // Assuming name is under user model
      institution: {
        name: teacher.institution?.name || "No Institution",
        link: teacher.institution?.website || "No Website",
      },
      suggestions: teacher.suggestions.length || 0, // Handling suggestions count
      courses: teacher.courses.map(course => ({
        name: course.title,
        link: `/courses/${course.id}`, // Creating a link to the course
      })),
      price: teacher.income, // Assuming price refers to teacher's income
    }));

    return transformedTeachers;
  } catch (error) {
    console.log("[GET_ALL_TEACHERS] Error:", error);
    return null;
  }
};
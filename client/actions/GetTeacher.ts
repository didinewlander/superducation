import db from "@/lib/db";
import { Teacher, User, Institute, Course, Appointment } from "@prisma/client";
import { Teacher as TeacherType } from "@/app/(application)/(routes)/teachers/find/_components/columns";

export const getAllTeachers = async (): Promise<TeacherType[] | null> => {
  try {
    const teachers = await db.teacher.findMany({
      include: {
        user: true,
        institution: true,
        appointments: {
          where: {
            startTime: {
              gte: new Date(),
              lte: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
            },
          },
        },
        courses: {
          where: {
            isPublished: true,
          },
          select: {
            title: true,
            id: true,
            priceInCents: true,
            purchases: true,
            studentsEnrolled: true,
          },
        },
        suggestions: {
          select: {
            courseId: true,
            description: true,
            title: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const transformedTeachers: TeacherType[] = teachers.map((teacher) => {
      let prices = [1];
      prices = teacher.courses
        .map((course) => course.priceInCents)
        .filter((price) => price !== null) as number[];
      let priceRange = "No Courses";

      if (prices && prices.length > 0) {
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        priceRange = `Price range: $${min / 100} - $${max / 100}`;
      }
      if (prices && prices.length == 0) {
        priceRange = "No Price Range";
      }

      return {
        id: teacher.id,
        name: teacher.user?.name,
        gender: teacher.user?.gender,
        institution: {
          name: teacher.institution?.name,
          website: teacher.institution?.website,
        },
        suggestions: teacher.suggestions.map((suggestion) => ({
          courseId: suggestion.courseId,
          description: suggestion.description,
          title: suggestion.title,
        })),
        rating: 5,
        courses: teacher.courses.map((course) => ({
          title: course.title,
          link: `/courses/${course.id}`,
        })),
        price: priceRange,
        joinedDate: new Date(),
        role: "", // Add role property
        priceRange: "", // Add priceRange property
        appointmentLoad: 50, // Add appointmentLoad property
        latestUpload: new Date(), // Add latestUpload property
      };
    });

    return transformedTeachers;
  } catch (error) {
    console.log("[GET_ALL_TEACHERS] Error:", error);
    return null;
  }
};

export const getTeacher = async (teacherId: string) => {
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
            category: true, // Assuming there's a category relation to include
          },
        },
        appointments: {
          orderBy: {
            startTime: "asc",
          },
          where: {
            endTime: {
              gte: new Date(), // Only future appointments
            },
          },
        },
      },
    });

    if (!teacher) {
      console.log("[GET_TEACHER] Teacher not found");
      return null;
    }

    return teacher;
  } catch (error) {
    console.log("[GET_TEACHER]", error);
    return null;
  }
};

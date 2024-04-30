import { InstituteMinimumDetail } from "@/app/(application)/(routes)/institutions/find/_components/columns";
import { auth } from "@/auth";
import { db } from '@/lib/db'

import { formatData } from "@/lib/utils";
import { Institute } from "@prisma/client";
import { NextResponse } from "next/server";

type GetInstitutes = {
  userId?: string;
  name?: string;
};

export const getInstitute = async ({ userId, name }: GetInstitutes) => {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const institutes = await db.institute.findMany({
      where: {
        userId,
        name: {
          contains: name,
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return institutes;
  } catch (error) {
    console.error("[GET_INSTITUTE]", error);
    return [];
  }
};

export const getAllInstitutions = async (): Promise<Institute[] | null> => {
  const session = await auth();
  if (!session) null;

  try {
    const institutes = await db.institute.findMany({});
    return institutes;
  } catch (error) {
    console.error("[GET_ALL_INSTITUTES]", error);
    return [];
  }
};

export const getTableInstitutions = async (): Promise<
  InstituteMinimumDetail[] | null
> => {
  const session = await auth();
  if (!session) return null;

  try {
    const institutes = await db.institute.findMany({
      where:{
        user:{
          isVerified: true
        }
      },
      select: {
        id: true,
        name: true,
        website: true,
        phoneNumber: true,
        students: {
          select: {
            _count: true,
          },
        },
      
      },
    });

    const formattedInstitutes: InstituteMinimumDetail[] = institutes.map(
      (institute) => ({
        id: institute.id,
        name: institute.name,
        website: institute.website,
        phoneNumber: institute.phoneNumber,
        overallRating: 10,
        numberOfStudents: institute.students.length,
      })
    );

    return formattedInstitutes;
  } catch (error) {
    console.error("[GET_ALL_INSTITUTES]", error);
    return [];
  }
};

/*
*
!!! FIX FUNCTION
* 
// */
// function calculateOverallRating(suggestions: Suggestion[]): number {
//   // Implement your rating calculation logic here
//   // For example, you could calculate the average rating based on suggestion descriptions
//   return suggestions.length > 0 ? 4 : 0; // Placeholder value, adjust as needed
// }

type CreateInstitute = {
  name: string;
  phoneNumber: string;
  website: string;
  userId: string;
};

export const createInstitute = async ({
  name,
  phoneNumber,
  website,
  userId,
}: CreateInstitute): Promise<Institute | null> => {
  try {
    const newInstitute = await db.institute.create({
      data: {
        name,
        phoneNumber,
        website,
        userId,
      },
    });
    return newInstitute;
  } catch (error) {
    console.error("[CREATE_INSTITUTE]", error);
    return null;
  }
};

export const updateInstitute = async (
  values: Institute
): Promise<Institute | null> => {
  try {
    const updatedInstitute = await db.institute.update({
      where: { id: values.id },
      data: values,
    });
    return updatedInstitute;
  } catch (error) {
    console.error("[UPDATE_INSTITUTE]", error);
    return null;
  }
};

export const deleteInstitute = async (
  id: string
): Promise<Institute | null> => {
  try {
    const deletedInstitute = await db.institute.delete({
      where: { id },
    });
    return deletedInstitute;
  } catch (error) {
    console.error("[DELETE_INSTITUTE]", error);
    return null;
  }
};

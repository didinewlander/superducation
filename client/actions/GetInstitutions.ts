import { auth } from "@/auth";
import db from "@/lib/db";
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

export const getAllInstitutions = async () => {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const institutes = await db.institute.findMany({});
    return institutes;
  } catch (error) {
    console.error("[GET_ALL_INSTITUTES]", error);
    return [];
  }
};

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

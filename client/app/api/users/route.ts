import { auth } from "@/auth";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { firstName, lastName, phone, gender, role } = await req.json();
    const session = await auth();
    const testInstitute = "9a5de7cb-0b4d-4bdd-b400-12f8434d4c0e";
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const roleRecord = await db.userRole.findUnique({
      where: { name: role },
    });

    if (!roleRecord) {
      return new NextResponse("Invalid role specified", { status: 400 });
    }

    const fullName = (await firstName) + " " + lastName;
    const user = await db.user.create({
      data: {
        name: fullName,
        email: session.user?.email || "",
        phone: phone,
        gender: gender,
        role: { connect: { id: roleRecord.id } },
      },
    });

    switch (role) {
      case "student":
        await db.student.create({
          data: {
            userId: user.id,
          },
        });
        break;
      case "teacher":
        await db.teacher.create({
          data: {
            userId: user.id,
            instituteId: testInstitute,
          },
        });
        break;
      case "institute":
        await db.institute.create({
          data: {
            userId: user.id,
            name: fullName,
            phoneNumber: phone,
            website: "",
          },
        });
        break;
      case "both":
        await db.student.create({
          data: {
            userId: user.id,
          },
        });
        await db.teacher.create({
          data: {
            userId: user.id,
            instituteId: testInstitute,
          },
        });
        break;
    }

    const response = {
      userId: user.id,
      role: role,
    };

    return NextResponse.json(response);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "[CREATE_USER] - There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    } else {
      console.log(e);
      return NextResponse.json(e);
    }
    console.log(e);
  }
}

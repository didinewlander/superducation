import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pay, BitPaymentRequest } from "@/lib/bitpay";
import { getUserIdByEmail } from "@/actions/GetUserByEmail";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();
    const apiKey = process.env.BIT_API_KEY || "4ec1d595ae764243";
    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = await getUserIdByEmail(session.user.email);
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: { id: params.courseId, isPublished: true },
    });

    if (!course) {
      return new NextResponse("Course not found!", { status: 404 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: { userId: userId!, courseId: params.courseId },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }
    const payment: BitPaymentRequest = {
      pageCode: "e635bb8a405b",
      userId: "userId",
      apiKey: apiKey,
      chargeType: 3,
      sum: course.priceInCents ? course.priceInCents / 100 : 0,
      successUrl: "successUrl",
      cancelUrl: "cancelUrl",
      paymentNum: 1,
      maxPaymentNum: 1,
      description: course.description,
      saveCardToken: 1,
      companyCommission: 0.2,
      notifyUrl: "",
      pageField: {
        invoiceName: `Superducation - ${course.title} - invoice`,
        fullName: session.user?.name || "",
        phone: +user.phone,
        email: user.email,
      },
      productData: [
        {
          catalog_number: 0,
          quantity: 1,
          price: course.priceInCents ? course.priceInCents / 100 : 0,
          item_description: "",
        },
      ],
      cField1: "",
      cField2: "",
    };

    const response = await pay({ params: payment });
    if (!response) {
      return new NextResponse("Internal server error", { status: 500 });
    }

    if (response.status !== 200) {
      return new NextResponse("Internal server error", { status: 500 });
    }
    const newPurchase = await db.purchase.create({
      data: {
        userId: userId!,
        courseId: params.courseId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: "Success",
      token: response,
      receiptNum: response,
      accessLink: `/courses/${params.courseId}`,
    });
  } catch (error) {
    console.error("Payment error: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

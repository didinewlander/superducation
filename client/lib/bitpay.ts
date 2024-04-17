import * as sdk from "@api/grow-il";
import { NextRequest, NextResponse } from "next/server";

/**
 * Interface representing a payment request for BitPay.
 */
interface PaymentRequest {
  /**
   * Unique identifier refers to payment method.
   */
  pageCode: string;

  /**
   * Unique identifier for businesses using Grow payments solutions.
   */
  userId: string;

  /**
   * Required for companies working with multiple businesses.
   */
  apiKey: string;

  /**
   * Charge type:
   * 1: Regular Charge
   * 2: Suspended Charge
   * 3: Create Token
   */
  chargeType: number | 1;

  /**
   * Total amount for payment, example: 10.99.
   */
  sum: number;

  /**
   * URL to redirect after successful payment.
   */
  successUrl?: string;

  /**
   * URL to redirect if payment is cancelled.
   */
  cancelUrl?: string;

  /**
   * Determine payments number (1-12).
   */
  paymentNum: number | 1;

  /**
   * Restricting the number of payments customer can choose (1-12).
   */
  maxPaymentNum: number;

  /**
   * Description of the product being charged.
   */
  description: string;

  /**
   * 0: Don't save, 1: Save the token of client's credit card.
   */
  saveCardToken: number;

  /**
   * Optional custom commission rate.
   */
  companyCommission?: number;

  /**
   * URL for server-to-server notification.
   */
  notifyUrl?: string;

  /**
   * Customer Information.
   */
  pageField: {
    /**
     * Invoice name.
     */
    invoiceName?: string;

    /**
     * Full name.
     */
    fullName?: string;

    /**
     * Phone number.
     */
    phone?: number;

    /**
     * Email address.
     */
    email?: string;
  };

  /**
   * Custom Fields.
   */
  cField1?: string;
  cField2?: string;
  cField3?: string;
  cField4?: string;
  cField5?: string;
  cField6?: string;
  cField7?: string;
  cField8?: string;
  cField9?: string;

  /**
   * Product Data (assuming array of product items).
   */
  productData: Array<{
    /**
     * Catalog number.
     */
    catalog_number: number;

    /**
     * Quantity.
     */
    quantity: number;

    /**
     * Price.
     */
    price: number;

    /**
     * Item description.
     */
    item_description: string;
  }>;
}

interface PaymentResponse {
  status: {
    type: "integer";
    description: "Status code indicating the result of the API call.";
    examples: [1];
  };
  err: {
    id: {
      type: "integer";
    };
    message: {
      type: "string";
    };
  };
  data: {
    processId: {
      type: "string";
      description: "Unique identifier for the payment process.";
      examples: ["734754"];
    };
    processToken: {
      type: "string";
      description: "Token associated with the payment process.";
      examples: ["2153287cd9af46457ae842337250b78d"];
    };
    url: {
      type: "string";
      description: "URL for the payment process.";
      examples: [
        "https://sandbox.meshulam.co.il/far?l=89a71a421b8e0686024fbb762dab61e1"
      ];
    };
  };
}

export async function POST(
  request: NextRequest,
  { params }: { params: PaymentRequest }
) {
  try {
    const userId = request.headers.get("userId");

    if (!userId) {
      return new NextResponse("User ID is missing.", { status: 400 });
    }

    const options = new FormData();

    options.append("pageCode", params.pageCode);
    options.append("userId", params.userId);
    options.append("chargeType", params.chargeType.toString());
    options.append("sum", params.sum.toString());
    options.append("successUrl", params.successUrl || "");
    options.append("cancelUrl", params.cancelUrl || "");
    options.append("paymentNum", params.paymentNum.toString());
    options.append("maxPaymentNum", params.maxPaymentNum.toString());
    options.append("description", params.description);
    options.append("saveCardToken", params.saveCardToken.toString());
    options.append(
      "companyCommission",
      params.companyCommission?.toString() || ""
    );
    options.append("notifyUrl", params.notifyUrl || "");
    options.append(
      "pageField[invoiceName]",
      params.pageField.invoiceName || ""
    );
    options.append("pageField[fullName]", params.pageField.fullName || "");
    options.append(
      "pageField[phone]",
      params.pageField.phone?.toString() || ""
    );
    options.append("pageField[email]", params.pageField.email || "");
    options.append("cField1", params.cField1 || "");
    options.append("cField2", params.cField2 || "");

    params.productData.forEach((product, index) => {
      options.append(
        `productData[${index}][catalog_number]`,
        product.catalog_number.toString()
      );
      options.append(
        `productData[${index}][quantity]`,
        product.quantity.toString()
      );
      options.append(`productData[${index}][price]`, product.price.toString());
      options.append(
        `productData[${index}][item_description]`,
        product.item_description
      );
    });

    options.append(
      "apiKey",
      process.env.BIT_API_KEY ? process.env.BIT_API_KEY : "57ce86548429"
    ); // in case of error with current api - turn to test key

    const response: PaymentResponse = await fetch(
      process.env.BIT_SERVER
        ? process.env.BIT_SERVER
        : "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data",
        },
        body: options,
      }
    ).then((res) => res.json());

    const userPaymentToken = response.data.processToken;
  } catch (error) {}
}

export const Bit = sdk.default;

import { Bit } from "@/lib/bitpay";
import { NextRequest } from "next/server";

type BitResponse = {
  body: {
    type: "object";
    properties: {
      status: {
        type: "integer";
        description: "Status code indicating the result of the API call.";
        examples: [1];
      };
      err: {
        type: "object";
        properties: {
          id: {
            type: "integer";
          };
          message: {
            type: "string";
          };
        };
      };
      data: {
        type: "object";
        properties: {
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
      };
    };
    $schema: "http://json-schema.org/draft-04/schema#";
  };
};

export async function POST(req: NextRequest) {
  const body = await req.text();

  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: body,
    };

    let response = await Bit.postApiLightServer10Createpaymentprocess(
      options
    ).then((res) => res.data);

    response
  } catch (error: any) {}
}

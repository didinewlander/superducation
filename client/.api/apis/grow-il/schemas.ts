const PostApiLightServer10Createpaymentprocess = {
  body: {
    type: "object",
    properties: {
      pageCode: {
        type: "string",
        description: "Unique identifier refers to payment mathod",
        examples: ["0b7a16e03b25"],
      },
      userId: {
        type: "string",
        description:
          "Unique identifier refers to every business that is connected and uses Grow payments solutions.",
        examples: ["4ec1d595ae764243"],
      },
      apiKey: {
        type: "string",
        description:
          "Required only for companies that are working with multiple businesses. company's code",
        examples: ["57ce86548429"],
      },
      chargeType: {
        type: "integer",
        description:
          "1 - Regular Charge\n2 - Suspended Charge\n3 - Create Token",
        examples: ["1"],
      },
      sum: {
        type: "integer",
        description: "Total amount for payment Example: 10.99.",
        examples: ["2"],
      },
      successUrl: {
        type: "string",
        description:
          'An after payment "Thank you" URL. make sure to use HTTPS and not HTTP. Must use an external URL and not localhost. Example: https://mysite.co.il?success=true',
        examples: ["https://mysite.co.il/thank.html?test=1"],
      },
      cancelUrl: {
        type: "string",
        description:
          "The page users will be redirected to if a payment is cancelled.",
        examples: ["https://mysite.co.il"],
      },
      paymentNum: {
        type: "integer",
        description: "Determine payments number. 1-12",
        examples: ["10"],
      },
      maxPaymentNum: {
        type: "integer",
        description:
          "Restricting the number of payments. the customer can choose between 1- the value that you choose in this parameter.",
        examples: ["12"],
      },
      description: {
        type: "string",
        description:
          "Description of the product to be charged (will appear in the details of the transaction as well) Example: Payment for a monthly subscription.",
        examples: ["Course"],
      },
      "pageField[invoiceName]": {
        type: "string",
        description: "the name for the invoice",
        examples: ["Jon Jon"],
      },
      "pageField[fullName]": {
        type: "string",
        description: "Full name must consist of at least two names.",
        examples: ["John Smith"],
      },
      "pageField[phone]": {
        type: "integer",
        description: "A valid israeli mobile phone numebr Example: 0500000000 ",
        examples: ["0509721696"],
      },
      "pageField[email]": {
        type: "string",
        description: "A valid email address",
        examples: ["test@gmail.com"],
      },
      cField1: {
        type: "string",
        description: "Custom field, you may add up to 9 fields.",
        examples: ["my_key123"],
      },
      cField2: {
        type: "string",
        description: "Custom field, you may add up to 9 fields.",
        examples: ["next456"],
      },
      saveCardToken: {
        type: "integer",
        description:
          "if set to 1: the token of client credit card will be sent after payment for running future tokenization payments . \nif you set 0 the token of client credit card wil not be saved .",
        examples: ["1"],
      },
      "productData[0][catalog_number]": {
        type: "integer",
        description: "catalog number for an item in the Invoice ",
        examples: ["8787989"],
      },
      "productData[0][quantity]": {
        type: "integer",
        description: "quantity for an item in the Invoice ",
        examples: ["2"],
      },
      "productData[0][price]": {
        type: "integer",
        description: "price for an item in the Invoice ",
        examples: ["1"],
      },
      "productData[0][item_description]": {
        type: "string",
        description: "item description for an item in the Invoice ",
        examples: ["first item description"],
      },
      companyCommission: {
        type: "number",
        description:
          "Float A different commission than the regular commission Meshulam has. Example: 2.5.",
        examples: ["2.5"],
      },
      notifyUrl: {
        type: "string",
        examples: ["Url for server to sever request"],
      },
    },
    $schema: "http://json-schema.org/draft-04/schema#",
  },
  response: { "200": { $schema: "http://json-schema.org/draft-04/schema#" } },
} as const;

const PostApiLightServer10CreatepaymentprocessResponse = {
  body: {
    type: "object",
    properties: {
      status: {
        type: "integer",
        description: "Status code indicating the result of the API call.",
        examples: [1],
      },
      err: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          message: {
            type: "string",
          },
        },
      },
      data: {
        type: "object",
        properties: {
          processId: {
            type: "string",
            description: "Unique identifier for the payment process.",
            examples: ["734754"],
          },
          processToken: {
            type: "string",
            description: "Token associated with the payment process.",
            examples: ["2153287cd9af46457ae842337250b78d"],
          },
          url: {
            type: "string",
            description: "URL for the payment process.",
            examples: [
              "https://sandbox.meshulam.co.il/far?l=89a71a421b8e0686024fbb762dab61e1",
            ],
          },
        },
      },
    },
    $schema: "http://json-schema.org/draft-04/schema#",
  },
} as const;

export {
  PostApiLightServer10Createpaymentprocess,
  PostApiLightServer10CreatepaymentprocessResponse,
};

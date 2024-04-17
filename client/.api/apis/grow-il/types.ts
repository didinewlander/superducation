import type { FromSchema } from "json-schema-to-ts";
import * as schemas from "./schemas";

export type PostApiLightServer10CreatepaymentprocessBodyParam = FromSchema<
  typeof schemas.PostApiLightServer10Createpaymentprocess.body
>;
export type PostApiLightServer10CreatepaymentprocessResponse200 = FromSchema<
  (typeof schemas.PostApiLightServer10Createpaymentprocess.response)["200"]
>;
export type BitpayResponse = FromSchema<
  typeof schemas.PostApiLightServer10CreatepaymentprocessResponse.body
>;

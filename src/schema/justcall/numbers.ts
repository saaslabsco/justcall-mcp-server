import z from "zod";

// Numbers Schemas
export const ListNumbersSchema = {
  justcall_line_name: z
    .string()
    .optional()
    .describe(
      "Search for the number details using the name of the JustCall phone line set by you for this number"
    ),
  availability_setting: z
    .enum(["Always Open", "Always Closed", "Custom Hours"])
    .optional()
    .describe(
      "Get a list of phone numbers set to the same type of Business Hours setting in JustCall"
    ),
  number_type: z
    .enum(["local", "mobile", "toll_free"])
    .optional()
    .describe("Filter phone numbers based on the type of the number"),
  number_owner_id: z
    .number()
    .optional()
    .describe("Search for all the numbers owned by an agent"),
  shared_agent_id: z
    .number()
    .optional()
    .describe("Search for all the numbers shared with an agent"),
  shared_group_id: z
    .number()
    .optional()
    .describe("Search for all the numbers shared with group"),
  capabilities: z
    .enum(["call", "sms", "mms"])
    .optional()
    .describe("Filter numbers based on the capabilities"),
  page: z.number().optional().describe("Page number for pagination"),
  per_page: z
    .number()
    .optional()
    .describe(
      "Count of phone number records to be fetched per page. Default value is 30 and maximum value is 100."
    ),
  order: z
    .enum(["ASC", "DESC"])
    .optional()
    .describe("Order in which the phone number records should appear"),
};

export const GetNumberSchema = {
  id: z.number().describe("Unique identifier of the phone number"),
};

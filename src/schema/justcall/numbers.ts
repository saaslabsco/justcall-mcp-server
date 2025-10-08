import z from "zod";

// Numbers Schemas
export const ListNumbersSchema = {
  type: z
    .enum(["local", "toll_free", "international"])
    .optional()
    .describe("Filter numbers by type"),
  status: z
    .enum(["active", "inactive", "pending"])
    .optional()
    .describe("Filter numbers by status"),
  country_code: z
    .string()
    .optional()
    .describe("Filter numbers by country code"),
  page: z.number().optional().describe("Page number for pagination"),
  per_page: z.number().optional().describe("Number of phone numbers per page"),
};

export const GetNumberSchema = {
  id: z.number().describe("Unique identifier of the phone number"),
};

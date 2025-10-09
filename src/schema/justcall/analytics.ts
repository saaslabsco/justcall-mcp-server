import z from "zod";

// Agent Analytics Schemas
export const GetAgentAnalyticsSchema = {
  from_date: z.string().describe("Start date (yyyy-mm-dd)"),
  to_date: z.string().describe("End date (yyyy-mm-dd)"),
  agent_id: z.number().optional().describe("Agent ID to filter analytics"),
};

// Account Analytics Schemas
export const GetAccountAnalyticsSchema = {
  from_date: z.string().describe("Start date (yyyy-mm-dd)"),
  to_date: z.string().describe("End date (yyyy-mm-dd)"),
};

// Number Analytics Schemas
export const GetNumberAnalyticsSchema = {
  from_date: z.string().describe("Start date (yyyy-mm-dd)"),
  to_date: z.string().describe("End date (yyyy-mm-dd)"),
  justcall_number: z
    .string()
    .optional()
    .describe("JustCall number for which the analytics are to be fetched."),
};

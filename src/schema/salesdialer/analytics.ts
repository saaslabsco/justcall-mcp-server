import z from "zod";

// Sales Dialer Analytics Schema
export const GetSalesDialerAnalyticsSchema = {
  from_date: z.string().describe("Start date for analytics (yyyy-mm-dd)"),
  to_date: z.string().describe("End date for analytics (yyyy-mm-dd)"),
  campaign_id: z
    .number()
    .optional()
    .describe("Specific campaign ID to filter analytics"),
  agent_id: z
    .number()
    .optional()
    .describe("Specific agent ID to filter analytics"),
  type: z
    .enum(["overview", "detailed", "performance"])
    .optional()
    .describe("Type of analytics to retrieve"),
};

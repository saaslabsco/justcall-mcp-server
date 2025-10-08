import z from "zod";

// Agent Analytics Schemas
export const GetAgentAnalyticsSchema = {
  from_date: z.string().describe("Start date (yyyy-mm-dd)"),
  to_date: z.string().describe("End date (yyyy-mm-dd)"),
  agent_id: z.number().optional().describe("Agent ID to filter analytics"),
};

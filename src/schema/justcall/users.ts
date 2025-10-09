import z from "zod";

// User Schemas
export const ListUsersSchema = {
  available: z
    .boolean()
    .optional()
    .describe(
      "Use available=true to get only those agents that are available as per their working hours in JustCall. By default, we will provide data for all agents irrespective of their availability."
    ),
  group_id: z
    .number()
    .optional()
    .describe(
      "Filter agents based on the User Groups they belong to in JustCall."
    ),
  role: z
    .string()
    .optional()
    .describe("Filter agents based on the role they are assigned in JustCall."),
  page: z
    .number()
    .optional()
    .describe("Page number for which user records are to be fetched"),
  per_page: z
    .number()
    .optional()
    .describe(
      "Number of user records to be fetched per page. Default value is 50 and maximum value is 100."
    ),
  order: z
    .enum(["asc", "desc"])
    .optional()
    .describe(
      "Order in which the user records should appear based on the agent_id"
    ),
};

export const GetUserSchema = {
  id: z.number().describe("Unique Id of the agent (JustCall user)"),
};

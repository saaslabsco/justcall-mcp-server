import z from "zod";

// User Schemas
export const ListUsersSchema = {
  page: z.number().optional().describe("Page number for pagination"),
  per_page: z.number().optional().describe("Number of users per page"),
  status: z
    .enum(["active", "inactive", "all"])
    .optional()
    .describe("Filter users by status"),
};

export const GetUserSchema = {
  id: z.number().describe("Unique identifier of the user"),
};

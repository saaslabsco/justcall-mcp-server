import z from "zod";

// Contact Schemas
export const ListContactsSchema = {
  contact_number: z.string().optional().describe("Phone number of the contact"),
  first_name: z.string().optional().describe("First name of the contact"),
  last_name: z.string().optional().describe("Last name of the contact"),
  per_page: z
    .number()
    .optional()
    .describe(
      "Number of contacts to be fetched per page. Default value is 50 and maximum value is 500."
    ),
  page: z
    .number()
    .optional()
    .describe(
      "Page number for which contacts are to be fetched. Page number '0' indicates first page containing records."
    ),
  order: z
    .enum(["asc", "desc"])
    .optional()
    .describe(
      "Order in which the contacts list should appear based on the 'id' of the contact. Recently added contacts are represented by larger 'id' values. Defaults to DESC (descending order)."
    ),
};

export const CreateContactSchema = {
  first_name: z.string().describe("First name of the contact"),
  last_name: z.string().optional().describe("Last name of the contact"),
  contact_number: z.string().describe("Phone number of the contact"),
  other_numbers: z
    .array(
      z.object({
        label: z.string(),
        number: z.string(),
      })
    )
    .optional()
    .describe("Other phone numbers associated with the contact"),
  extension: z
    .number()
    .optional()
    .describe("Assign an extension to the contact"),
  email: z.string().optional().describe("Email id of the contact"),
  company: z
    .string()
    .optional()
    .describe("Company with which the contact is associated"),
  address: z.string().optional().describe("Address of the contact"),
  notes: z
    .string()
    .optional()
    .describe("Additional information added for the contact in JustCall"),
  across_team: z
    .boolean()
    .optional()
    .describe(
      "Choose to add a contact for all agents or only for the account owner"
    ),
  agent_id: z
    .number()
    .optional()
    .describe(
      "Specify the agent_id to create contact only for a specific agent"
    ),
  agent_ids: z
    .array(z.string())
    .optional()
    .describe(
      "Specify the agent_ids to create contact only for a specific agents"
    ),
};

import z from "zod";

// Campaign Schemas
export const ListCampaignsSchema = {
  from_datetime: z
    .string()
    .optional()
    .describe("Start datetime for filtering campaigns"),
  to_datetime: z
    .string()
    .optional()
    .describe("End datetime for filtering campaigns"),
  type: z.string().optional().describe("Campaign type filter"),
  contact_number: z.string().optional().describe("Contact number to filter by"),
  sales_dialer_number: z
    .string()
    .optional()
    .describe("Sales dialer number to filter by"),
  page: z.number().optional().describe("Page number for pagination"),
  per_page: z.number().optional().describe("Number of campaigns per page"),
  order: z.string().optional().describe("Order for sorting"),
  last_campaign_id_fetched: z
    .number()
    .optional()
    .describe("Last campaign ID fetched"),
};

export const GetCampaignSchema = {
  id: z.number().describe("Unique identifier of the campaign"),
};

export const CreateCampaignSchema = {
  name: z.string().describe("Provide a name for the campaign"),
  country_code: z
    .string()
    .describe(
      "Default country code for phone numbers where the country code is not present"
    ),
  type: z
    .enum(["Autodial", "Predictive", "Dynamic"])
    .optional()
    .describe("Select a type from Autodial, Predictive, or Dynamic"),
  maximum_calls_per_agent: z
    .number()
    .optional()
    .describe(
      "Maximum number of calls allowed per agent (2-10, only for Predictive)"
    ),
  default_number: z
    .string()
    .optional()
    .describe("Set a default phone number for the campaign"),
  call_forwarding_number: z
    .string()
    .optional()
    .describe("Number to which incoming calls should be forwarded"),
  assign_agents: z
    .string()
    .optional()
    .describe("Comma separated IDs of agents to assign to the campaign"),
  contact_dialing_order: z
    .enum(["first_in_first_out", "last_in_first_out"])
    .optional()
    .describe("Order in which contacts are dialed"),
  disposition_groups: z
    .string()
    .optional()
    .describe("Comma separated IDs of Disposition Groups"),
  call_scripts: z
    .string()
    .optional()
    .describe("Comma separated IDs of Call Scripts"),
  voicemail_message_id: z
    .number()
    .optional()
    .describe("ID of the voicemail audio message"),
  abandoning_message_id: z
    .number()
    .optional()
    .describe("ID of the abandoning audio message"),
};

export const UpdateCampaignSchema = {
  id: z.number().describe("Unique identifier of the campaign"),
  name: z.string().optional().describe("Updated name of the campaign"),
  type: z
    .enum(["Autodial", "Predictive", "Dynamic"])
    .optional()
    .describe("Updated campaign type"),
  maximum_calls_per_agent: z
    .number()
    .optional()
    .describe("Updated maximum calls per agent"),
  default_number: z
    .string()
    .optional()
    .describe("Updated default phone number"),
  call_forwarding_number: z
    .string()
    .optional()
    .describe("Updated call forwarding number"),
  assign_agents: z
    .string()
    .optional()
    .describe("Updated comma separated agent IDs"),
  contact_dialing_order: z
    .enum(["first_in_first_out", "last_in_first_out"])
    .optional()
    .describe("Updated dialing order"),
  disposition_groups: z
    .string()
    .optional()
    .describe("Updated disposition groups"),
  call_scripts: z.string().optional().describe("Updated call scripts"),
  voicemail_message_id: z
    .number()
    .optional()
    .describe("Updated voicemail message ID"),
  abandoning_message_id: z
    .number()
    .optional()
    .describe("Updated abandoning message ID"),
};

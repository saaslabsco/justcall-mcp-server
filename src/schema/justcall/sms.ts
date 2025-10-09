import z from "zod";

// SMS Schemas
export const SendSmsSchema = {
  contact_number: z
    .string()
    .describe(
      "Number of the contact with country code to which SMS is to be sent. Please follow the E.164 number format."
    ),
  justcall_number: z
    .string()
    .describe(
      "JustCall number using which the SMS is to be sent. Please follow the E.164 number format (+141555XXXXX)."
    ),
  body: z
    .string()
    .describe(
      "Enter the content to be sent in the SMS. Maximum character limit for message is 1600."
    ),
  media_url: z
    .string()
    .optional()
    .describe(
      "If any media files need to be sent, add comma-separated URL links to media_url"
    ),
  restrict_once: z
    .enum(["Yes", "No"])
    .optional()
    .describe(
      "Set value to Yes to prevent the SMS from being sent to the same receiver in 24 hours. Default value is set to No."
    ),
  schedule_at: z
    .string()
    .optional()
    .describe(
      "Enter the date and time (YYYY-MM-DD HH:mm:ss) at which the SMS is to be sent."
    ),
};

export const ListSmsSchema = {
  from_datetime: z
    .string()
    .optional()
    .describe(
      "Datetime in yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format starting from when the SMS are to be fetched in user's timezone."
    ),
  to_datetime: z
    .string()
    .optional()
    .describe(
      "Datetime in yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format till when the SMS are to be fetched in user's timezone."
    ),
  last_sms_id_fetched: z
    .number()
    .optional()
    .describe(
      "Id of the last SMS fetched in the previous query. This Id ensures that you won't receive any duplicate data when using the 'next_page_link' parameter."
    ),
  contact_number: z
    .string()
    .optional()
    .describe(
      "Number of the contact for which SMS are to be fetched. Please follow the E.164 number format."
    ),
  justcall_number: z
    .string()
    .optional()
    .describe(
      "JustCall number for which the SMS are to be fetched. Please follow the E.164 number format."
    ),
  sms_direction: z
    .enum(["incoming", "outgoing"])
    .optional()
    .describe("To fetch data only for incoming SMS or for outgoing SMS"),
  sms_content: z.string().optional().describe("Keywords of the content of SMS"),
  page: z
    .number()
    .optional()
    .describe("Page number for which SMS are to be fetched"),
  per_page: z
    .number()
    .optional()
    .describe(
      "Number of SMS to be fetched per page. Default value is 20 and maximum value is 100."
    ),
  sort: z
    .enum(["id", "datetime"])
    .optional()
    .describe("By default we apply sorting on id field."),
  order: z
    .string()
    .optional()
    .describe(
      "Order in which the SMS list should appear based on the 'sort' parameter selected above."
    ),
};

export const GetSmsSchema = {
  id: z.number().describe("Unique identifier of the SMS/text message"),
};

export const CheckSmsReplySchema = {
  contact_number: z
    .string()
    .describe("Contact phone number to check for replies (E.164 format)"),
  justcall_number: z
    .string()
    .optional()
    .describe("JustCall number to filter replies (E.164 format)"),
};

// SMS Tags Schemas
export const ListSmsTagsSchema = {
  page: z.number().optional().describe("Page number for pagination"),
  per_page: z.number().optional().describe("Number of tags per page"),
  order: z
    .enum(["asc", "desc"])
    .optional()
    .describe("Order in which the tags should appear based on the tag id."),
};

export const GetSmsTagSchema = {
  id: z.number().describe("Unique identifier of the SMS tag"),
};

export const CreateSmsTagSchema = {
  name: z.string().describe("Name of the SMS tag"),
  color_code: z
    .string()
    .describe("Add a hex color code to provide a color for the tag"),
  agent_id: z
    .number()
    .optional()
    .describe("Enter the id of an agent to associate the tag with."),
};

export const DeleteSmsTagSchema = {
  id: z.number().describe("Unique identifier of the SMS tag to delete"),
};

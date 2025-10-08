import z from "zod";

// SMS Schemas
export const SendSmsSchema = {
  to: z.string().describe("Recipient phone number with country code"),
  from: z.string().describe("Sender JustCall phone number"),
  body: z.string().describe("Text message content"),
  media_urls: z
    .array(z.string())
    .optional()
    .describe("Array of media URLs to attach to the message"),
};

export const ListSmsSchema = {
  from_datetime: z
    .string()
    .optional()
    .describe("Start datetime in yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format"),
  to_datetime: z
    .string()
    .optional()
    .describe("End datetime in yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format"),
  contact_number: z
    .string()
    .optional()
    .describe("Contact phone number to filter messages"),
  direction: z
    .enum(["sent", "received", "failed"])
    .optional()
    .describe("Message direction filter"),
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
};

export const GetSmsTagSchema = {
  id: z.number().describe("Unique identifier of the SMS tag"),
};

export const CreateSmsTagSchema = {
  name: z.string().describe("Name of the SMS tag"),
  color: z.string().describe("Color code for the tag (hex format)"),
};

export const DeleteSmsTagSchema = {
  id: z.number().describe("Unique identifier of the SMS tag to delete"),
};

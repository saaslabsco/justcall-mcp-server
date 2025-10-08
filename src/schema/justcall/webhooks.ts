import z from "zod";

// Webhook Schemas
export const ListWebhooksSchema = {
  status: z
    .enum(["active", "inactive", "failed"])
    .optional()
    .describe("Filter webhooks by status"),
  event_type: z.string().optional().describe("Filter webhooks by event type"),
  page: z.number().optional().describe("Page number for pagination"),
  per_page: z.number().optional().describe("Number of webhooks per page"),
};

export const CreateWebhookSchema = {
  url: z.string().describe("Webhook URL endpoint"),
  events: z.array(z.string()).describe("Array of event types to subscribe to"),
  description: z.string().optional().describe("Description of the webhook"),
  secret: z
    .string()
    .optional()
    .describe("Secret key for webhook signature verification"),
};

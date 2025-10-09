import z from "zod";

// Webhook Schemas
export const ListWebhooksSchema = {
  type: z
    .enum([
      "call.completed",
      "call.answered",
      "call.initiated",
      "call.incoming",
      "call.updated",
      "call.enters_queue",
      "call.exits_queue",
      "jc.call_ai_generated",
      "call.voicemail",
      "call.missed",
      "call.ai_voice_agent",
      "sms.sent_received",
      "sms.sent",
      "sms.received",
      "sms.status_updated",
      "sd.call_completed",
      "sd.call_updated",
      "sd.call_ai_generated",
      "whatsapp.message_sent",
      "whatsapp.message_received",
      "whatsapp.message_status_updated",
      "jc.contact_status_updated",
      "appointment.scheduled",
    ])
    .optional()
    .describe(
      "Select a type to search for subscribed events of a specific type."
    ),
};

export const CreateWebhookSchema = {
  webhook_url: z
    .string()
    .describe("Configure the URL on which you want to receive the response."),
  type: z
    .enum([
      "call.completed",
      "call.answered",
      "call.initiated",
      "call.incoming",
      "call.updated",
      "call.enters_queue",
      "call.exits_queue",
      "jc.call_ai_generated",
      "call.voicemail",
      "call.missed",
      "call.ai_voice_agent",
      "sms.sent_received",
      "sms.sent",
      "sms.received",
      "sms.status_updated",
      "sd.call_completed",
      "sd.call_updated",
      "sd.call_ai_generated",
      "whatsapp.message_sent",
      "whatsapp.message_received",
      "whatsapp.message_status_updated",
      "jc.contact_status_updated",
      "appointment.scheduled",
    ])
    .describe("Select an event type to add URL."),
};

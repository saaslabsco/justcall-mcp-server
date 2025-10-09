import { BaseJustCallDto } from "./base.js";

// Webhook DTOs
export interface ListWebhooksDto extends BaseJustCallDto {
  type?:
    | "call.completed"
    | "call.answered"
    | "call.initiated"
    | "call.incoming"
    | "call.updated"
    | "call.enters_queue"
    | "call.exits_queue"
    | "jc.call_ai_generated"
    | "call.voicemail"
    | "call.missed"
    | "call.ai_voice_agent"
    | "sms.sent_received"
    | "sms.sent"
    | "sms.received"
    | "sms.status_updated"
    | "sd.call_completed"
    | "sd.call_updated"
    | "sd.call_ai_generated"
    | "whatsapp.message_sent"
    | "whatsapp.message_received"
    | "whatsapp.message_status_updated"
    | "jc.contact_status_updated"
    | "appointment.scheduled";
}

export interface CreateWebhookDto extends BaseJustCallDto {
  webhook_url: string;
  type:
    | "call.completed"
    | "call.answered"
    | "call.initiated"
    | "call.incoming"
    | "call.updated"
    | "call.enters_queue"
    | "call.exits_queue"
    | "jc.call_ai_generated"
    | "call.voicemail"
    | "call.missed"
    | "call.ai_voice_agent"
    | "sms.sent_received"
    | "sms.sent"
    | "sms.received"
    | "sms.status_updated"
    | "sd.call_completed"
    | "sd.call_updated"
    | "sd.call_ai_generated"
    | "whatsapp.message_sent"
    | "whatsapp.message_received"
    | "whatsapp.message_status_updated"
    | "jc.contact_status_updated"
    | "appointment.scheduled";
}

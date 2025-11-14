import { BaseJustCallDto } from "./base.js";

// WhatsApp DTOs
export interface ListWhatsAppMessagesDto extends BaseJustCallDto {
  fetch_template_data?: boolean;
  from_datetime?: string;
  to_datetime?: string;
  last_message_id_fetched?: number;
  contact_number?: string;
  justcall_number?: string;
  message_direction?: "incoming" | "outgoing";
  message_content?: string;
  delivery_status?: "read" | "delivered" | "sent" | "received" | "failed";
  page?: number;
  per_page?: number;
  order?: "asc" | "desc";
}

export interface GetWhatsAppMessageDto extends BaseJustCallDto {
  id: number;
  fetch_template_data?: boolean;
}

export interface SendWhatsAppMessageDto extends BaseJustCallDto {
  justcall_number: string;
  contact_number: string;
  body?: string;
  media_url?: string;
  media_file_name?: string;
  restrict_once?: "Yes" | "No";
  template_id?: number;
  template_variables?: string[];
}

export interface ListWhatsAppTemplatesDto extends BaseJustCallDto {
  justcall_number: string;
  template_name?: string;
  language?:
    | "English"
    | "English (UK)"
    | "English (US)"
    | "Spanish"
    | "German"
    | "Swedish"
    | "Finnish"
    | "Dutch"
    | "French"
    | "Turkish"
    | "Italian"
    | "Polish"
    | "Danish"
    | "Portuguese (BR)"
    | "Portuguese (POR)";
  category?: "Marketing" | "Utility";
  page?: number;
  per_page?: number;
  order?: "asc" | "desc";
}

export interface CheckWhatsAppReplyDto extends BaseJustCallDto {
  justcall_number: string;
  contact_number: string;
}

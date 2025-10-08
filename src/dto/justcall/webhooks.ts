import { BaseJustCallDto } from "./base.js";

// Webhook DTOs
export interface ListWebhooksDto extends BaseJustCallDto {
  type?: string;
}

export interface CreateWebhookDto extends BaseJustCallDto {
  url: string;
  events: string[];
  secret?: string;
  is_active?: boolean;
}

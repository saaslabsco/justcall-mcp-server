import { BaseJustCallDto } from "./base.js";

// SMS/Text Messages DTOs
export interface ListSmsDto extends BaseJustCallDto {
  from_datetime?: string;
  to_datetime?: string;
  last_sms_id_fetched?: number;
  contact_number?: string;
  justcall_number?: string;
  sms_direction?: "incoming" | "outgoing";
  sms_content?: string;
  page?: number;
  per_page?: number;
  sort?: "id" | "datetime";
  order?: string;
}

export interface SendSmsDto extends BaseJustCallDto {
  contact_number: string;
  justcall_number: string;
  body: string;
  media_url?: string;
  restrict_once?: "Yes" | "No";
  schedule_at?: string;
}

export interface GetSmsDto extends BaseJustCallDto {
  id: number;
}

export interface CheckSmsReplyDto extends BaseJustCallDto {
  contact_number: string;
  justcall_number?: string;
}

// SMS Tags DTOs
export interface ListSmsTagsDto extends BaseJustCallDto {
  page?: number;
  per_page?: number;
  order?: "asc" | "desc";
}

export interface GetSmsTagDto extends BaseJustCallDto {
  id: number;
}

export interface CreateSmsTagDto extends BaseJustCallDto {
  name: string;
  color_code: string;
  agent_id?: number;
}

export interface DeleteSmsTagDto extends BaseJustCallDto {
  id: number;
}

// SMS Threads DTOs
export interface ListSmsThreadsDto extends BaseJustCallDto {
  phone_id: number;
  from_datetime?: string;
  to_datetime?: string;
  contact_number?: string;
  keyword?: string;
  tag_id?: number;
  per_page?: number;
  page?: number;
  order?: "asc" | "desc";
}

export interface GetSmsThreadDto extends BaseJustCallDto {
  thread_id: string;
  offset?: number;
  limit?: number;
}

export interface AddTagToThreadDto extends BaseJustCallDto {
  tag_id: number;
  thread_id?: string;
  phone_id?: number;
  justcall_number?: string;
  contact_number?: string;
}

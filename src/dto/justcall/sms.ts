import { BaseJustCallDto } from "./base.js";

// SMS/Text Messages DTOs
export interface ListSmsDto extends BaseJustCallDto {
  from_datetime?: string;
  to_datetime?: string;
  contact_number?: string;
  justcall_number?: string;
  direction?: "sent" | "received" | "failed";
  page?: number;
  per_page?: number;
}

export interface SendSmsDto extends BaseJustCallDto {
  from: string;
  to: string;
  body: string;
  media_urls?: string[];
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
}

export interface GetSmsTagDto extends BaseJustCallDto {
  id: number;
}

export interface CreateSmsTagDto extends BaseJustCallDto {
  name: string;
  color: string;
}

export interface DeleteSmsTagDto extends BaseJustCallDto {
  id: number;
}

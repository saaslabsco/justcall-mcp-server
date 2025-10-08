import { BaseJustCallDto } from "./base.js";

// List Calls DTO
export interface ListCallsDto extends BaseJustCallDto {
  fetch_queue_data?: boolean;
  from_datetime?: string; // yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format
  to_datetime?: string; // yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format
  contact_number?: number;
  justcall_number?: number;
  agent_id?: number;
  ivr_digit?: number;
  call_direction?: "Incoming" | "Outgoing";
  call_type?: string;
  page?: number;
  per_page?: number;
  sort?: "id" | "datetime";
  order?: "asc" | "desc";
  fetch_ai_data?: boolean;
  last_call_id_fetched?: number;
  call_traits?: string[];
  disposition_codes?: string[];
}

// Get Call DTO
export interface GetCallDto extends BaseJustCallDto {
  id: number;
  fetch_queue_data?: boolean;
  fetch_ai_data?: boolean;
}

// Update Call DTO
export interface UpdateCallDto extends BaseJustCallDto {
  id: number;
  notes?: string;
  disposition?: string;
  rating?: number;
}

// Get Call Journey DTO
export interface GetCallJourneyDto extends BaseJustCallDto {
  id: number;
}

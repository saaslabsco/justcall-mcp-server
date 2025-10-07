// Base DTO for common JustCall API parameters
export interface BaseJustCallDto {
  companyId?: number;
  authToken?: string;
}

// List Calls DTO
export interface ListCallsDto extends BaseJustCallDto {
  fetch_queue_data?: boolean;
  from_datetime?: string; // yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format
  to_datetime?: string; // yyyy-mm-dd hh:mm:ss or yyyy-mm-dd format
  contact_number?: string;
  justcall_number?: string;
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

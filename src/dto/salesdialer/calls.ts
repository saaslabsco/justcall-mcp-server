import { BaseSalesDialerDto } from "./base.js";

// Sales Dialer Calls DTOs
export interface ListSalesDialerCallsDto extends BaseSalesDialerDto {
  campaign_id?: number;
  fetch_ai_data?: boolean;
  from_datetime?: string;
  to_datetime?: string;
  contact_number?: number;
  sales_dialer_number?: number;
  agent_id?: number;
  call_type?:
    | "OUTGOING_ANSWERED_CALL"
    | "OUTGOING_HUMAN_ANSWERED"
    | "OUTGOING_MACHINE_ANSWERED"
    | "OUTGOING_UNANSWERED_CALL"
    | "OUTGOING_FAILED_CALL"
    | "OUTGOING_RESTRICTED_CALL"
    | "OUTGOING_BLOCKED_CALL"
    | "OUTGOING_CANCELLED_CALL"
    | "OUTGOING_ABANDONED_CALL";
  page?: number;
  per_page?: number;
  sort?: "id" | "datetime";
  order?: "asc" | "desc";
  last_call_id_fetched?: number;
}

export interface GetSalesDialerCallDto extends BaseSalesDialerDto {
  id: number;
  fetch_ai_data?: boolean;
}

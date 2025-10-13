import { BaseJustCallDto } from "./base.js";

// JustCall AI DTOs for Calls
export interface ListCallsAiDataDto extends BaseJustCallDto {
  platform?: "justcall" | "sales_dialer";
  phone_number?: number;
  fetch_transcription?: boolean;
  fetch_summary?: boolean;
  fetch_ai_insights?: boolean;
  fetch_action_items?: boolean;
  fetch_smart_chapters?: boolean;
  agent_id?: number;
  from_datetime?: string;
  to_datetime?: string;
  page?: number;
  per_page?: number;
  order?: "asc" | "desc";
}

export interface GetCallAiDataDto extends BaseJustCallDto {
  id: number;
  platform?: "justcall" | "sales_dialer";
  fetch_transcription?: boolean;
  fetch_summary?: boolean;
  fetch_ai_insights?: boolean;
  fetch_action_items?: boolean;
  fetch_smart_chapters?: boolean;
}

// JustCall AI DTOs for Meetings
export interface ListMeetingsAiDataDto extends BaseJustCallDto {
  platform?: "zoom" | "google_meet";
  meeting_id?: string;
  fetch_transcription?: boolean;
  fetch_summary?: boolean;
  fetch_ai_insights?: boolean;
  fetch_smart_chapters?: boolean;
  agent_id?: number;
  from_datetime?: string;
  to_datetime?: string;
  page?: number;
  per_page?: number;
  order?: "asc" | "desc";
}

export interface GetMeetingAiDataDto extends BaseJustCallDto {
  instance_sid: string;
  fetch_transcription?: boolean;
  fetch_summary?: boolean;
  fetch_ai_insights?: boolean;
  fetch_smart_chapters?: boolean;
}

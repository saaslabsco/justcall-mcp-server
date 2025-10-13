import { BaseJustCallDto } from "./base.js";

export interface GetVoiceAgentDto extends BaseJustCallDto {
  id: number;
}

export interface ListVoiceAgentsDto extends BaseJustCallDto {
  per_page?: number;
  page?: number;
  order?: "asc" | "desc";
}

export interface DynamicVariable {
  name: string;
  value: string;
  type?: "string";
}

export interface InitiateVoiceAgentCallDto extends BaseJustCallDto {
  ai_agent_id: string;
  contact_number: string;
  has_consent: boolean;
  dynamic_variables?: DynamicVariable[];
}

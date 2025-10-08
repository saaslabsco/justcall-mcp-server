import { BaseSalesDialerDto } from "./base.js";

// Campaign DTOs
export interface ListCampaignsDto extends BaseSalesDialerDto {
  from_datetime?: string;
  to_datetime?: string;
  type?: string;
  contact_number?: string;
  sales_dialer_number?: string;
  page?: number;
  per_page?: number;
  order?: string;
  last_campaign_id_fetched?: number;
}

export interface GetCampaignDto extends BaseSalesDialerDto {
  id: number;
}

export interface CreateCampaignDto extends BaseSalesDialerDto {
  name: string;
  country_code: string;
  type?: "Autodial" | "Predictive" | "Dynamic";
  maximum_calls_per_agent?: number;
  default_number?: string;
  call_forwarding_number?: string;
  assign_agents?: string;
  contact_dialing_order?: "first_in_first_out" | "last_in_first_out";
  disposition_groups?: string;
  call_scripts?: string;
  voicemail_message_id?: number;
  abandoning_message_id?: number;
}

export interface UpdateCampaignDto extends BaseSalesDialerDto {
  id: number;
  name?: string;
  type?: "Autodial" | "Predictive" | "Dynamic";
  maximum_calls_per_agent?: number;
  default_number?: string;
  call_forwarding_number?: string;
  assign_agents?: string;
  contact_dialing_order?: "first_in_first_out" | "last_in_first_out";
  disposition_groups?: string;
  call_scripts?: string;
  voicemail_message_id?: number;
  abandoning_message_id?: number;
}

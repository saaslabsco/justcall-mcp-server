
// Base DTO for common JustCall API parameters
export interface BaseJustCallDto {
  companyId: number;

  authToken: string;
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

  call_direction?: 'Incoming' | 'Outgoing';

  call_type?: string;

  page?: number;

  per_page?: number;

  sort?: 'id' | 'datetime';

  order?: 'asc' | 'desc';

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

// Create Appointment DTO
export interface CreateAppointmentDto extends BaseJustCallDto {
  calendar_link: string;

  customer_first_name: string;

  customer_last_name: string;

  customer_email: string;

  customer_number: string;

  customer_timezone: string;

  appointment_customer_date: string; // yyyy-dd-mm

  appointment_customer_time: string; // hh:mm:ss

  notes?: string;
}

// Get Available Slots DTO
export interface GetAvailableSlotsDto extends BaseJustCallDto {
  calendar_link: string;

  date: string; // yyyy-mm-dd

  timezone: string;
}

// Users/Agents DTOs
export interface ListUsersDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;

  status?: 'active' | 'inactive' | 'all';
}

export interface GetUserDto extends BaseJustCallDto {
  id: number;
}

export interface CreateUserDto extends BaseJustCallDto {
  first_name: string;

  last_name: string;

  email: string;

  phone?: string;

  role?: 'admin' | 'agent' | 'manager';

  team_ids?: number[];
}

export interface UpdateUserDto extends BaseJustCallDto {
  id: number;

  first_name?: string;

  last_name?: string;

  email?: string;

  phone?: string;

  role?: 'admin' | 'agent' | 'manager';

  is_active?: boolean;
}

// Contacts DTOs
export interface ListContactsDto extends BaseJustCallDto {
  contact_number?: string;

  first_name?: string;

  last_name?: string;

  per_page?: number;

  page?: number;

  order?: 'asc' | 'desc';
}

export interface GetContactDto extends BaseJustCallDto {
  id: number;
}

export interface CreateContactDto extends BaseJustCallDto {
  first_name: string;

  last_name?: string;

  email?: string;

  phone: string;

  company?: string;

  designation?: string;

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  zip_code?: string;
}

export interface UpdateContactDto extends BaseJustCallDto {
  id: number;

  first_name?: string;

  last_name?: string;

  email?: string;

  phone?: string;

  company?: string;

  designation?: string;
}

// SMS/Text Messages DTOs
export interface ListSmsDto extends BaseJustCallDto {
  from_datetime?: string;

  to_datetime?: string;

  contact_number?: string;

  justcall_number?: string;

  direction?: 'sent' | 'received' | 'failed';

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

// Numbers DTOs
export interface ListNumbersDto extends BaseJustCallDto {
  status?: 'active' | 'inactive' | 'all';

  type?: 'local' | 'toll_free' | 'international';

  country?: string;

  page?: number;

  per_page?: number;
}

export interface GetNumberDto extends BaseJustCallDto {
  id: number;
}

export interface UpdateNumberDto extends BaseJustCallDto {
  id: number;

  name?: string;

  is_active?: boolean;

  assigned_users?: number[];
}

// Teams DTOs
export interface ListTeamsDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;
}

export interface GetTeamDto extends BaseJustCallDto {
  id: number;
}

export interface CreateTeamDto extends BaseJustCallDto {
  name: string;

  description?: string;

  user_ids?: number[];
}

// Call Recordings DTOs
export interface ListRecordingsDto extends BaseJustCallDto {
  from_datetime?: string;

  to_datetime?: string;

  call_id?: number;

  agent_id?: number;

  page?: number;

  per_page?: number;
}

export interface GetRecordingDto extends BaseJustCallDto {
  id: number;
}

// Analytics DTOs
export interface GetAnalyticsDto extends BaseJustCallDto {
  from_date: string; // yyyy-mm-dd

  to_date: string; // yyyy-mm-dd

  type?: 'calls' | 'sms' | 'users' | 'teams';

  user_ids?: number[];

  team_ids?: number[];
}

// Sales Dialer DTOs
export interface GetSalesDialerAnalyticsDto extends BaseJustCallDto {
  from_date: string; // yyyy-mm-dd

  to_date: string; // yyyy-mm-dd

  campaign_ids?: number[];

  agent_ids?: number[];

  granularity?: 'daily' | 'weekly' | 'monthly';
}

export interface ListCampaignsDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;

  status?: 'active' | 'paused' | 'completed' | 'all';

  search?: string;
}

export interface GetCampaignDto extends BaseJustCallDto {
  id: number;
}

export interface CreateCampaignDto extends BaseJustCallDto {
  name: string;

  description?: string;

  contact_ids: number[];

  agent_ids?: number[];

  dialer_type?: 'power_dialer' | 'preview_dialer' | 'predictive_dialer';
}

// Webhook DTOs
export interface ListWebhooksDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;

  status?: 'active' | 'inactive';
}

export interface GetWebhookDto extends BaseJustCallDto {
  id: number;
}

export interface CreateWebhookDto extends BaseJustCallDto {
  url: string;

  events: string[];

  secret?: string;

  is_active?: boolean;
}

export interface UpdateWebhookDto extends BaseJustCallDto {
  id: number;

  url?: string;

  events?: string[];

  secret?: string;

  is_active?: boolean;
}

// IVR DTOs
export interface ListIvrDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;

  search?: string;
}

export interface GetIvrDto extends BaseJustCallDto {
  id: number;
}

// Conference DTOs
export interface ListConferencesDto extends BaseJustCallDto {
  from_datetime?: string;

  to_datetime?: string;

  page?: number;

  per_page?: number;

  status?: 'active' | 'completed' | 'all';
}

export interface GetConferenceDto extends BaseJustCallDto {
  id: number;
}

export interface CreateConferenceDto extends BaseJustCallDto {
  name: string;

  participant_numbers?: string[];

  record_conference?: boolean;

  scheduled_time?: string;
}

// Voicemail DTOs
export interface ListVoicemailsDto extends BaseJustCallDto {
  from_datetime?: string;

  to_datetime?: string;

  contact_number?: string;

  justcall_number?: string;

  page?: number;

  per_page?: number;

  status?: 'read' | 'unread' | 'all';
}

export interface GetVoicemailDto extends BaseJustCallDto {
  id: number;
}

export interface UpdateVoicemailDto extends BaseJustCallDto {
  id: number;

  is_read?: boolean;

  notes?: string;
}

// Call Queue DTOs
export interface ListCallQueuesDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;

  status?: 'active' | 'inactive';
}

export interface GetCallQueueDto extends BaseJustCallDto {
  id: number;
}

export interface GetCallQueueStatsDto extends BaseJustCallDto {
  queue_id: number;

  from_date?: string;

  to_date?: string;
}

// User Groups DTOs
export interface ListUserGroupsDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;

  search?: string;
}

export interface GetUserGroupDto extends BaseJustCallDto {
  id: number;
}



// Additional Appointment DTOs

export interface GetAppointmentDto extends BaseJustCallDto {
  id: number;
}


// SMS Tags DTOs
export interface ListSmsTagsDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;
}

export interface CreateSmsTagDto extends BaseJustCallDto {
  name: string;

  color: string;
}

// DeleteSmsTagDto removed per user request

// Additional Team DTOs
export interface UpdateTeamDto extends BaseJustCallDto {
  id: number;

  name?: string;

  description?: string;

  user_ids?: number[];
}

// DeleteTeamDto removed per user request

// Additional Contact DTOs - Delete DTO removed per user request

// Additional Webhook DTOs - Delete DTO removed per user request

// Additional Number DTOs
export interface CreateNumberDto extends BaseJustCallDto {
  number: string;

  name?: string;

  country?: string;

  type?: 'local' | 'toll_free' | 'international';
}

// DeleteNumberDto removed per user request

// Additional Campaign DTOs
export interface UpdateCampaignDto extends BaseJustCallDto {
  id: number;

  name?: string;

  description?: string;

  status?: 'active' | 'paused' | 'completed';

  contact_ids?: number[];

  agent_ids?: number[];
}

// DeleteCampaignDto removed per user request

// Additional Conference DTOs
export interface UpdateConferenceDto extends BaseJustCallDto {
  id: number;

  name?: string;

  participant_numbers?: string[];

  record_conference?: boolean;
}

// DeleteConferenceDto removed per user request

// Additional Recording DTOs
// DeleteRecordingDto removed per user request

// Call Tags DTOs
export interface ListCallTagsDto extends BaseJustCallDto {
  page?: number;

  per_page?: number;
}

export interface CreateCallTagDto extends BaseJustCallDto {
  name: string;

  color: string;
}

// Number Analytics DTOs
export interface GetNumberAnalyticsDto extends BaseJustCallDto {
  from_date: string;

  to_date: string;

  justcall_number?: string;
}

// Additional Appointment DTOs
export interface ListAppointmentsDto extends BaseJustCallDto {
  from_date?: string;

  to_date?: string;

  page?: number;

  per_page?: number;
}

export interface UpdateAppointmentDto extends BaseJustCallDto {
  id: number;

  date_time?: string;

  duration?: number;
}

// Additional User Group DTOs
export interface CreateUserGroupDto extends BaseJustCallDto {
  name: string;

  description?: string;
}

export interface UpdateUserGroupDto extends BaseJustCallDto {
  id: number;

  name?: string;

  description?: string;
}

// Agent Analytics DTOs
export interface GetAgentAnalyticsDto extends BaseJustCallDto {
  from_date: string;

  to_date: string;

  agent_id?: number;
}


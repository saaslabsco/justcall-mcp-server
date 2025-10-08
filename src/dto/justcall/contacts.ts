import { BaseJustCallDto } from "./base.js";

// Contacts DTOs
export interface ListContactsDto extends BaseJustCallDto {
  contact_number?: string;
  first_name?: string;
  last_name?: string;
  per_page?: number;
  page?: number;
  order?: "asc" | "desc";
}

export interface GetContactDto extends BaseJustCallDto {
  id: number;
}

export interface CreateContactDto extends BaseJustCallDto {
  first_name: string;
  last_name?: string;
  contact_number: string;
  other_numbers?: Array<{ label: string; number: string }>;
  extension?: number;
  email?: string;
  company?: string;
  address?: string;
  notes?: string;
  across_team?: boolean;
  agent_id?: number;
  agent_ids?: string[];
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

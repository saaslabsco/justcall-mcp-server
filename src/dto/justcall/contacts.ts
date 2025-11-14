import { BaseJustCallDto } from "./base.js";

// Contacts DTOs
export interface ListContactsDto extends BaseJustCallDto {
  across_team?: boolean;
  agent_ids?: number[];
  contact_number?: string;
  first_name?: string;
  last_name?: string;
  status?: ("blacklist" | "dnd" | "dnm")[];
  per_page?: number;
  page?: number;
  order?: "asc" | "desc";
  last_contact_id_fetched?: number;
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
  id?: number;
  contact_number?: string;
  first_name?: string;
  last_name?: string;
  other_numbers?: Array<{ label: string; number: string }>;
  email?: string;
  extension?: number;
  company?: string;
  address?: string;
  notes?: Array<{ note: string }>;
  across_team?: boolean;
}

export interface UpdateContactStatusDto extends BaseJustCallDto {
  id?: number;
  contact_number?: string;
  add_to?: ("blacklist" | "dnd" | "dnm")[];
  remove_from?: ("blacklist" | "dnd" | "dnm")[];
  across_team?: boolean;
}

export interface AddContactsBlacklistDto extends BaseJustCallDto {
  contact_numbers: string[];
  add_to: ("blacklist" | "dnd" | "dnm")[];
  across_team?: boolean;
}

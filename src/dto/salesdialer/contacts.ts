import { BaseSalesDialerDto } from "./base.js";

// Custom Field DTO
export interface CustomFieldDto {
  key: string;
  value: string;
}

// Sales Dialer Contacts DTOs
export interface ListSalesDialerContactsDto extends BaseSalesDialerDto {
  phone_number?: string;
  email?: string;
  status?: "Active" | "DNCA";
  last_contact_id_fetched?: number;
  per_page?: number;
  page?: number;
  order?: "ASC" | "DESC";
}

export interface GetSalesDialerContactDto extends BaseSalesDialerDto {
  id: number;
}

export interface CreateSalesDialerContactDto extends BaseSalesDialerDto {
  name: string;
  phone_number: string;
  email?: string;
  birthday?: string;
  occupation?: string;
  address?: string;
  custom_fields?: CustomFieldDto[];
}

export interface UpdateSalesDialerContactDto extends BaseSalesDialerDto {
  id: number;
  name?: string;
  email?: string;
  birthday?: string;
  occupation?: string;
  address?: string;
  custom_fields?: CustomFieldDto[];
}

// Bulk Import DTOs
export interface SdContactPayloadDto {
  name: string;
  phone_number: string;
  email?: string;
  birthday?: string;
  occupation?: string;
  address?: string;
  custom_fields?: CustomFieldDto[];
}

export interface ImportSalesDialerContactsDto extends BaseSalesDialerDto {
  campaign_id?: number;
  callback_url?: string;
  contacts: SdContactPayloadDto[];
}

export interface ImportSalesDialerContactsStatusDto extends BaseSalesDialerDto {
  batch_id: string;
}

// Bulk Add DNCA DTO
export interface AddSalesDialerContactsDncaDto extends BaseSalesDialerDto {
  contact_numbers?: string[];
  contact_ids?: number[];
}

// Custom Fields DTO
export interface ListSalesDialerCustomFieldsDto extends BaseSalesDialerDto {
  id?: number;
  label?: string;
}

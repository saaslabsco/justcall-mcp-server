import { BaseJustCallDto } from "./base.js";

// Numbers DTOs
export interface ListNumbersDto extends BaseJustCallDto {
  justcall_line_name?: string;
  availability_setting?: string;
  number_type?: string;
  number_owner_id?: number;
  shared_agent_id?: number;
  shared_group_id?: number;
  capabilities?: string;
  per_page?: number;
  page?: number;
  order?: string;
}

export interface GetNumberDto extends BaseJustCallDto {
  id: number;
}

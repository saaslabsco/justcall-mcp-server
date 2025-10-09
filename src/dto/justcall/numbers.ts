import { BaseJustCallDto } from "./base.js";

// Numbers DTOs
export interface ListNumbersDto extends BaseJustCallDto {
  justcall_line_name?: string;
  availability_setting?: "Always Open" | "Always Closed" | "Custom Hours";
  number_type?: "local" | "mobile" | "toll_free";
  number_owner_id?: number;
  shared_agent_id?: number;
  shared_group_id?: number;
  capabilities?: "call" | "sms" | "mms";
  per_page?: number;
  page?: number;
  order?: "ASC" | "DESC";
}

export interface GetNumberDto extends BaseJustCallDto {
  id: number;
}

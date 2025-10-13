import { BaseJustCallDto } from "./base.js";

// User Groups DTOs
export interface ListUserGroupsDto extends BaseJustCallDto {
  per_page?: number;
  page?: number;
  order?: "asc" | "desc";
}

export interface GetUserGroupDto extends BaseJustCallDto {
  id: number;
}

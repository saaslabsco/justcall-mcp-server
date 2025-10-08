import { BaseJustCallDto } from "./base.js";

// User Groups DTOs
export interface ListUserGroupsDto extends BaseJustCallDto {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface GetUserGroupDto extends BaseJustCallDto {
  id: number;
}

export interface CreateUserGroupDto extends BaseJustCallDto {
  name: string;
  description?: string;
}

export interface UpdateUserGroupDto extends BaseJustCallDto {
  id: number;
  name?: string;
  description?: string;
}

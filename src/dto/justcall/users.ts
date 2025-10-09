import { BaseJustCallDto } from "./base.js";

// Users/Agents DTOs
export interface ListUsersDto extends BaseJustCallDto {
  available?: boolean;
  group_id?: number;
  role?: string;
  page?: number;
  per_page?: number;
  order?: "asc" | "desc";
}

export interface GetUserDto extends BaseJustCallDto {
  id: number;
}

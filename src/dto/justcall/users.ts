import { BaseJustCallDto } from "./base.js";

// Users/Agents DTOs
export interface ListUsersDto extends BaseJustCallDto {
  page?: number;
  per_page?: number;
  status?: "active" | "inactive" | "all";
}

export interface GetUserDto extends BaseJustCallDto {
  id: number;
}

export interface CreateUserDto extends BaseJustCallDto {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role?: "admin" | "agent" | "manager";
  team_ids?: number[];
}

export interface UpdateUserDto extends BaseJustCallDto {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  role?: "admin" | "agent" | "manager";
  is_active?: boolean;
}

import { BaseJustCallDto } from "./base.js";

// Agent Analytics DTOs (for /v2.1/calls/analytics/agent endpoint)
export interface BaseAnalyticsDto extends BaseJustCallDto {
  from_date: string;
  to_date: string;
}

export interface GetAgentAnalyticsDto extends BaseAnalyticsDto {
  agent_id?: number;
}

// Account Analytics DTOs (for /v2.1/calls/analytics/account endpoint)
export interface GetAccountAnalyticsDto extends BaseAnalyticsDto {}

// Number Analytics DTOs (for /v2.1/calls/analytics/number endpoint)
export interface GetNumberAnalyticsDto extends BaseAnalyticsDto {
  justcall_number: number;
}

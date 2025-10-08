import { BaseJustCallDto } from "./base.js";

// Agent Analytics DTOs (for /v2.1/calls/analytics/agent endpoint)
export interface GetAgentAnalyticsDto extends BaseJustCallDto {
  from_date: string;
  to_date: string;
  agent_id?: number;
}

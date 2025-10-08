import { BaseSalesDialerDto } from "./base.js";

// Sales Dialer Analytics DTOs
export interface GetSalesDialerAnalyticsDto extends BaseSalesDialerDto {
  from_date: string; // yyyy-mm-dd
  to_date: string; // yyyy-mm-dd
  campaign_ids?: number[];
  agent_ids?: number[];
  granularity?: "daily" | "weekly" | "monthly";
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// JustCall Tools
import { registerCallTools } from "./justcall/call.js";
import { registerUserTools } from "./justcall/users.js";
import { registerSmsTools } from "./justcall/sms.js";
import { registerContactTools } from "./justcall/contacts.js";
import { registerAnalyticsTools } from "./justcall/analytics.js";
import { registerWebhookTools } from "./justcall/webhooks.js";
import { registerNumberTools } from "./justcall/numbers.js";

// SalesDialer Tools
import { registerCampaignTools } from "./salesdialer/campaigns.js";
import { registerSalesDialerAnalyticsTools } from "./salesdialer/analytics.js";

export const registerAllTools = (server: McpServer) => {
  // JustCall Core API Tools
  registerCallTools(server);
  registerUserTools(server);
  registerSmsTools(server);
  registerContactTools(server);
  registerAnalyticsTools(server);
  registerWebhookTools(server);
  registerNumberTools(server);

  // SalesDialer Tools
  registerCampaignTools(server);
  registerSalesDialerAnalyticsTools(server);
};

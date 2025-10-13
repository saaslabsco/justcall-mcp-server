import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// JustCall Tools
import { registerCallTools } from "./justcall/call.js";
import { registerUserTools } from "./justcall/users.js";
import { registerSmsTools } from "./justcall/sms.js";
import { registerContactTools } from "./justcall/contacts.js";
import { registerAnalyticsTools } from "./justcall/analytics.js";
import { registerWebhookTools } from "./justcall/webhooks.js";
import { registerNumberTools } from "./justcall/numbers.js";
import { registerUserGroupTools } from "./justcall/userGroups.js";
import { registerAppointmentTools } from "./justcall/appointments.js";
import { registerWhatsAppTools } from "./justcall/whatsapp.js";
import { registerAiTools } from "./justcall/ai.js";

// SalesDialer Tools
import { registerCampaignTools } from "./salesdialer/campaigns.js";
import { registerSalesDialerAnalyticsTools } from "./salesdialer/analytics.js";
import { registerSalesDialerContactTools } from "./salesdialer/contacts.js";
import { registerSalesDialerCallTools } from "./salesdialer/calls.js";

export const registerAllTools = (server: McpServer) => {
  // JustCall Core API Tools
  registerCallTools(server);
  registerUserTools(server);
  registerSmsTools(server);
  registerContactTools(server);
  registerAnalyticsTools(server);
  registerWebhookTools(server);
  registerNumberTools(server);
  registerUserGroupTools(server);
  registerAppointmentTools(server);
  registerWhatsAppTools(server);
  registerAiTools(server);

  // SalesDialer Tools
  registerCampaignTools(server);
  registerSalesDialerAnalyticsTools(server);
  registerSalesDialerContactTools(server);
  registerSalesDialerCallTools(server);
};

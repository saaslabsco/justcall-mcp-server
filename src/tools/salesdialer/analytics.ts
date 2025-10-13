import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { SalesDialerApiService } from "../../sdk/salesdialer.js";
import { GetSalesDialerAnalyticsSchema } from "../../schema/salesdialer/index.js";

export const registerSalesDialerAnalyticsTools = (server: McpServer) => {
  const salesdialerAPIservice = new SalesDialerApiService();

  // Get Sales Dialer Analytics Tool
  server.tool(
    "get_salesdialer_agent_analytics",
    "Retrieve call performance analytics of a specific agent for a Sales Dialer campaign",
    GetSalesDialerAnalyticsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.getSalesDialerAnalytics({
        authToken,
        context,
        ...params,
      });
    })
  );
};

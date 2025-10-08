import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { GetAgentAnalyticsSchema } from "../../schema/index.js";

export const registerAnalyticsTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // Get Agent Analytics Tool
  server.tool(
    "get_agent_analytics",
    "Retrieve agent analytics data for specified date range",
    GetAgentAnalyticsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getAgentAnalytics({
        authToken,
        ...params,
      });
    })
  );
};

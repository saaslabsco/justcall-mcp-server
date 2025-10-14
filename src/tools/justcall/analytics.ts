import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  GetAccountAnalyticsSchema,
  GetAgentAnalyticsSchema,
  GetNumberAnalyticsSchema,
} from "../../schema/index.js";

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
        context,
        ...params,
      });
    })
  );

  // Get Account analytics Tool
  server.tool(
    "get_account_analytics",
    "Retrieve account analytics data for specified date range",
    GetAccountAnalyticsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getAccountAnalytics({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Get Number analytics Tool
  server.tool(
    "get_number_analytics",
    "Retrieve number analytics data for specified date range",
    GetNumberAnalyticsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getNumberAnalytics({
        authToken,
        context,
        ...params,
      });
    })
  );
};

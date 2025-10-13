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
    "Retrieve call performance analytics for a specific agent identified by Agent ID",
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
    "Retrieve aggregated call analytics at the JustCall account level",
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
    "Retrieve call analytics for a specific JustCall phone number",
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

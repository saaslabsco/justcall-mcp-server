import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { SalesDialerApiService } from "../../sdk/salesdialer.js";
import {
  ListSalesDialerCallsSchema,
  GetSalesDialerCallSchema,
} from "../../schema/salesdialer/index.js";

export const registerSalesDialerCallTools = (server: McpServer) => {
  const salesdialerAPIservice = new SalesDialerApiService();

  // List Sales Dialer Calls Tool
  server.tool(
    "list_salesdialer_calls",
    "Retrieve all calls made via the Sales Dialer in JustCall",
    ListSalesDialerCallsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.listSalesDialerCalls({
        authToken,
        ...params,
      });
    })
  );

  // Get Sales Dialer Call Tool
  server.tool(
    "get_salesdialer_call",
    "Retrieve detailed information for a specific Sales Dialer call by Call ID",
    GetSalesDialerCallSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.getSalesDialerCall({
        authToken,
        ...params,
      });
    })
  );
};

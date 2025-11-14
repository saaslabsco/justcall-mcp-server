import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { ListNumbersSchema, GetNumberSchema } from "../../schema/index.js";

export const registerNumberTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Numbers Tool
  server.tool(
    "list_numbers",
    "Retrieve all phone numbers associated with the JustCall account",
    ListNumbersSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listNumbers({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Get Number Tool
  server.tool(
    "get_number",
    "Retrieve detailed information for a specific phone number by ID",
    GetNumberSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getNumber({
        authToken,
        context,
        ...params,
      });
    })
  );
};

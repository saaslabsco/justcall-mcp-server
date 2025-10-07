import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { ListCallsSchema } from "../../schema/index.js";

export const registerCallTools = (server: McpServer) => {
  server.tool(
    "list_calls",
    "Lists all JustCall calls",
    ListCallsSchema,
    createToolHandler(async (params, context) => {
      const justcallAPIservice = new JustCallApiService();
      const authHeader = context?.requestInfo?.headers.authorization;
      const [apiKey, apiSecret] =
        authHeader?.replace("Bearer ", "").split(":") || [];
      const authToken =
        apiKey && apiSecret
          ? `${apiKey}:${apiSecret}`
          : `${process.env.JUSTCALL_API_KEY}:${process.env.JUSTCALL_API_SECRET}`;
      return justcallAPIservice.listCalls({
        authToken,
        ...params,
      });
    })
  );
};

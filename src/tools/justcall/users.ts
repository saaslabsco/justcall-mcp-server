import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { ListUsersSchema, GetUserSchema } from "../../schema/index.js";

export const registerUserTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Users Tool
  server.tool(
    "list_users",
    "List all users/agents in the account",
    ListUsersSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listUsers({
        authToken,
        ...params,
      });
    })
  );

  // Get User Tool
  server.tool(
    "get_user",
    "Get detailed information for a specific user/agent",
    GetUserSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getUser({
        authToken,
        ...params,
      });
    })
  );
};

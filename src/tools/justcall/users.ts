import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { ListUsersSchema, GetUserSchema } from "../../schema/index.js";

export const registerUserTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Users Tool
  server.tool(
    "list_users",
    "Retrieve all users associated with the JustCall account",
    ListUsersSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listUsers({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Get User Tool
  server.tool(
    "get_user",
    "Retrieve detailed information for a specific user by ID",
    GetUserSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getUser({
        authToken,
        context,
        ...params,
      });
    })
  );
};

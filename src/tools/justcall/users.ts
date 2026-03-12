import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListUsersSchema,
  GetUserSchema,
  UpdateUserAvailabilitySchema,
} from "../../schema/index.js";

export const registerUserTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Users Tool
  server.tool(
    "list_users",
    "Retrieve all users associated with the JustCall account",
    ListUsersSchema,
    {
      readOnlyHint: true,
      destructiveHint: false,
    },
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listUsers({
        authToken,
        context,
        ...params,
      });
    }),
  );

  // Get User Tool
  server.tool(
    "get_user",
    "Retrieve detailed information for a specific user by ID",
    GetUserSchema,
    {
      readOnlyHint: true,
      destructiveHint: false,
    },
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getUser({
        authToken,
        context,
        ...params,
      });
    }),
  );

  // Update User Availability Tool
  server.tool(
    "update_user_availability",
    "Update a user's availability status in JustCall to available or unavailable for calls",
    UpdateUserAvailabilitySchema,
    {
      destructiveHint: true,
    },
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.updateUserAvailability({
        authToken,
        ...params,
      });
    }),
  );
};

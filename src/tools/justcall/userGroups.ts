import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListUserGroupsSchema,
  GetUserGroupSchema,
} from "../../schema/index.js";

export const registerUserGroupTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List User Groups Tool
  server.tool(
    "list_user_groups",
    "Retrieve all user groups defined in the JustCall account",
    ListUserGroupsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listUserGroups({
        authToken,
        ...params,
      });
    })
  );

  // Get User Group Tool
  server.tool(
    "get_user_group",
    "Retrieve detailed information for a specific user group by ID",
    GetUserGroupSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getUserGroup({
        authToken,
        ...params,
      });
    })
  );
};

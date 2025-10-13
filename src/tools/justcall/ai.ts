import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListCallsAiDataSchema,
  GetCallAiDataSchema,
  ListMeetingsAiDataSchema,
  GetMeetingAiDataSchema,
} from "../../schema/index.js";

export const registerAiTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Calls AI Data Tool
  server.tool(
    "list_calls_ai_analysis",
    "Retrieve AI-generated analysis for all calls associated with either JustCall or Sales Dialer",
    ListCallsAiDataSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listCallsAiData({
        authToken,
        ...params,
      });
    })
  );

  // Get Call AI Data Tool
  server.tool(
    "get_call_ai_analysis",
    "Retrieve AI-generated analysis for a specific call by Call ID associated with either JustCall or Sales Dialer",
    GetCallAiDataSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getCallAiData({
        authToken,
        ...params,
      });
    })
  );

  // List Meetings AI Data Tool
  server.tool(
    "list_meetings_ai_analysis",
    "Retrieve AI-generated analysis for recorded meetings",
    ListMeetingsAiDataSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listMeetingsAiData({
        authToken,
        ...params,
      });
    })
  );

  // Get Meeting AI Data Tool
  server.tool(
    "get_meeting_ai_analysis",
    "Retrieve AI-generated analysis for a specific meeting identified by Instance ID",
    GetMeetingAiDataSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getMeetingAiData({
        authToken,
        ...params,
      });
    })
  );
};

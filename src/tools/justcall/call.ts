import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListCallsSchema,
  GetCallSchema,
  UpdateCallSchema,
  GetCallJourneySchema,
  GetVoiceAgentSchema,
} from "../../schema/index.js";

export const registerCallTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Calls Tool
  server.tool(
    "list_calls",
    "Retrieve all calls associated with the JustCall account",
    ListCallsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listCalls({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    })
  );

  // Get Call Tool
  server.tool(
    "get_call",
    "Retrieve detailed information for a specific call by Call ID",
    GetCallSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getCall({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    })
  );

  // Update Call Tool
  server.tool(
    "update_call",
    "Update/modify details of an existing call record identified by Call ID",
    UpdateCallSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.updateCall({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    })
  );

  // Get Call Journey Tool
  server.tool(
    "get_call_journey",
    "Fetch the sequence of events for a specific call identified by Call ID",
    GetCallJourneySchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getCallJourney({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    })
  );

  // Get voice agent data
  server.tool(
    "get_voice_agent_data",
    "Retrieve voice agent related data for a specific call identified by Call ID",
    GetVoiceAgentSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getVoiceAgentData({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    })
  );
};

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
    "Lists all JustCall calls",
    ListCallsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listCalls({
        authToken,
        ...params,
      });
    })
  );

  // Get Call Tool
  server.tool(
    "get_call",
    "Get a specific JustCall call by ID",
    GetCallSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getCall({
        authToken,
        ...params,
      });
    })
  );

  // Update Call Tool
  server.tool(
    "update_call",
    "Update a JustCall call",
    UpdateCallSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.updateCall({
        authToken,
        ...params,
      });
    })
  );

  // Get Call Journey Tool
  server.tool(
    "get_call_journey",
    "Get call journey details",
    GetCallJourneySchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getCallJourney({
        authToken,
        ...params,
      });
    })
  );

  // Get voice agent data
  server.tool(
    "get_voice_agent_data",
    "Get voice agent data",
    GetVoiceAgentSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getVoiceAgentData({
        authToken,
        ...params,
      });
    })
  );
};

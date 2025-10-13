import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListVoiceAgentsSchema,
  InitiateVoiceAgentCallSchema,
} from "../../schema/index.js";

export const registerVoiceAgentTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Voice Agents Tool
  server.tool(
    "list_voice_agents",
    "Retrieve all AI voice agents associated with the JustCall account",
    ListVoiceAgentsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listVoiceAgents({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Initiate Voice Agent Call Tool
  server.tool(
    "create_voice_agent_call",
    "Initiate an outbound call from a configured AI voice agent to a contact number",
    InitiateVoiceAgentCallSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.initiateVoiceAgentCall({
        authToken,
        context,
        ...params,
      });
    })
  );
};

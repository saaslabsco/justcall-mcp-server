import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  ServerRequest,
  ServerNotification,
} from "@modelcontextprotocol/sdk/types.js";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListCallsSchema,
  GetCallSchema,
  UpdateCallSchema,
  GetCallJourneySchema,
  GetVoiceAgentSchema,
} from "../../schema/index.js";

import callListHtml from "../../ui/calls-list/index.html";
import callGetHtml from "../../ui/call-details/index.html";

export const registerCallTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Calls Tool
  server.registerTool(
    "list_calls",
    {
      title: "List Calls",
      description: "Retrieve all calls associated with the JustCall account",
      inputSchema: ListCallsSchema,
      annotations: {
        readOnlyHint: true,
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/calls-list.html",
        "openai/toolInvocation/invoking": "Fetching calls from JustCall",
        "openai/toolInvocation/invoked": "Calls fetched from JustCall",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true,
      },
    },
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listCalls({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    }),
  );

  server.resource(
    "calls_list_widget",
    "ui://widget/calls-list.html",
    {
      uri: "ui://widget/calls-list.html",
      mimeType: "text/html+skybridge",
      text: "Calls list",
      _meta: {
        "openai/outputTemplate": "ui://widget/calls-list.html",
        "openai/widgetCSP": {
          connect_domains: ["https://app.justcall.io"],
          resource_domains: ["https://cdn.justcall.io"],
          redirect_domains: ["https://app.justcall.io"],
        },
        "openai/widgetDomain": "https://mcp.justcall.host",
        "openai/widgetDescription": "Shows the list of calls",
      },
    },
    (
      uri: URL,
      extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
    ) => {
      return new Promise((resolve) => {
        resolve({
          contents: [
            {
              uri: uri.toString(),
              mimeType: "text/html+skybridge",
              text: callListHtml,
            },
          ],
        });
      });
    },
  );

  server.resource(
    "call_get_widget",
    "ui://widget/calls-get.html",
    {
      uri: "ui://widget/calls-get.html",
      mimeType: "text/html+skybridge",
      text: "Calls Get",
      _meta: {
        "openai/outputTemplate": "ui://widget/calls-get.html",
        "openai/widgetCSP": {
          connect_domains: ["https://app.justcall.io"],
          resource_domains: ["https://cdn.justcall.io"],
          redirect_domains: ["https://app.justcall.io"],
        },
        "openai/widgetDomain": "https://mcp.justcall.host",
        "openai/widgetDescription": "Shows the details of a call",
      },
    },
    (
      uri: URL,
      extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
    ) => {
      return new Promise((resolve) => {
        resolve({
          contents: [
            {
              uri: uri.toString(),
              mimeType: "text/html+skybridge",
              text: callGetHtml,
            },
          ],
        });
      });
    },
  );

  // Get Call Tool
  server.registerTool(
    "get_call",
    {
      title: "Get Call",
      description:
        "Retrieve detailed information for a specific call by Call ID",
      inputSchema: GetCallSchema,
      annotations: {
        readOnlyHint: true,
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/calls-get.html",
        "openai/toolInvocation/invoking": "Fetching single call from JustCall",
        "openai/toolInvocation/invoked": "Single call fetched from JustCall",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true,
      },
    },
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getCall({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    }),
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
    }),
  );

  // Get Call Journey Tool
  server.tool(
    "get_call_journey",
    "Fetch the sequence of events for a specific call identified by Call ID",
    GetCallJourneySchema,
    {
      readOnlyHint: true,
    },
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getCallJourney({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    }),
  );

  // Get voice agent data
  server.tool(
    "get_voice_agent_call",
    "Retrieve voice agent related data for a specific call identified by Call ID",
    GetVoiceAgentSchema,
    {
      readOnlyHint: true,
    },
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getVoiceAgentData({
        authToken,
        context, // Pass context for client identification
        ...params,
      });
    }),
  );
};

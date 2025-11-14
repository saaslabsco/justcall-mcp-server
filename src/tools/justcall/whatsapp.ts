import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListWhatsAppMessagesSchema,
  GetWhatsAppMessageSchema,
  SendWhatsAppMessageSchema,
  ListWhatsAppTemplatesSchema,
  CheckWhatsAppReplySchema,
} from "../../schema/index.js";

export const registerWhatsAppTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List WhatsApp Messages Tool
  server.tool(
    "list_whatsapp_messages",
    "Retrieve all whatsapp messages associated with the JustCall account",
    ListWhatsAppMessagesSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listWhatsAppMessages({
        authToken,
        ...params,
      });
    })
  );

  // Get WhatsApp Message Tool
  server.tool(
    "get_whatsapp_message",
    "Retrieve detailed information for a specific whatsapp message by ID",
    GetWhatsAppMessageSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getWhatsAppMessage({
        authToken,
        ...params,
      });
    })
  );

  // Send WhatsApp Message Tool
  server.tool(
    "send_whatsapp_message",
    "Send a new whatsapp message to a contact number",
    SendWhatsAppMessageSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.sendWhatsAppMessage({
        authToken,
        ...params,
      });
    })
  );

  // List WhatsApp Templates Tool
  server.tool(
    "list_whatsapp_templates",
    "Retrieve all whatsapp message templates available in the JustCall account",
    ListWhatsAppTemplatesSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listWhatsAppTemplates({
        authToken,
        ...params,
      });
    })
  );

  // Check WhatsApp Reply Tool
  server.tool(
    "check_whatsapp_message_reply",
    "Check for the most recent inbound whatsapp message from a contact number",
    CheckWhatsAppReplySchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.checkWhatsAppReply({
        authToken,
        ...params,
      });
    })
  );
};

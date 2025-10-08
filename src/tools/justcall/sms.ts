import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  SendSmsSchema,
  ListSmsSchema,
  GetSmsSchema,
  CheckSmsReplySchema,
  ListSmsTagsSchema,
  GetSmsTagSchema,
  CreateSmsTagSchema,
  DeleteSmsTagSchema,
} from "../../schema/index.js";

export const registerSmsTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // Send SMS Tool
  server.tool(
    "send_sms",
    "Send an SMS/text message to a contact",
    SendSmsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.sendSms({
        authToken,
        ...params,
      });
    })
  );

  // List SMS Tool
  server.tool(
    "list_sms",
    "Retrieve all SMS/text messages",
    ListSmsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listSms({
        authToken,
        ...params,
      });
    })
  );

  // Get SMS Tool
  server.tool(
    "get_sms",
    "Get detailed information for a specific SMS/text message",
    GetSmsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getSms({
        authToken,
        ...params,
      });
    })
  );

  // Check SMS Reply Tool
  server.tool(
    "check_sms_reply",
    "Check for the most recent inbound SMS reply from a specific contact",
    CheckSmsReplySchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.checkSmsReply({
        authToken,
        ...params,
      });
    })
  );

  // List SMS Tags Tool
  server.tool(
    "list_sms_tags",
    "Retrieve all SMS tags used for organizing text messages",
    ListSmsTagsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listSmsTags({
        authToken,
        ...params,
      });
    })
  );

  // Get SMS Tag Tool
  server.tool(
    "get_sms_tag",
    "Get detailed information for a specific SMS tag",
    GetSmsTagSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getSmsTag({
        authToken,
        ...params,
      });
    })
  );

  // Create SMS Tag Tool
  server.tool(
    "create_sms_tag",
    "Create a new tag for organizing SMS conversations",
    CreateSmsTagSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.createSmsTag({
        authToken,
        ...params,
      });
    })
  );

  // Delete SMS Tag Tool
  server.tool(
    "delete_sms_tag",
    "Delete a specific SMS tag",
    DeleteSmsTagSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.deleteSmsTag({
        authToken,
        ...params,
      });
    })
  );
};

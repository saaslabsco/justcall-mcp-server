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
  ListSmsThreadsSchema,
  GetSmsThreadSchema,
  AddTagToThreadSchema,
} from "../../schema/index.js";

export const registerSmsTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // Send SMS Tool
  server.tool(
    "send_sms_mms",
    "Send a new sms or text message or mms to a contact number",
    SendSmsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.sendSms({
        authToken,
        context,
        ...params,
      });
    })
  );

  // List SMS Tool
  server.tool(
    "list_sms",
    "Retrieve all sms/text messages associated with the JustCall account",
    ListSmsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listSms({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Get SMS Tool
  server.tool(
    "get_sms",
    "Retrieve detailed information for a specific sms/text by ID",
    GetSmsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getSms({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Check SMS Reply Tool
  server.tool(
    "check_sms_reply",
    "Check for the most recent inbound sms/text message from a contact number",
    CheckSmsReplySchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.checkSmsReply({
        authToken,
        context,
        ...params,
      });
    })
  );

  // List SMS Tags Tool
  server.tool(
    "list_sms_tags",
    "Retrieve the list of all sms tags defined in the JustCall account",
    ListSmsTagsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listSmsTags({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Get SMS Tag Tool
  server.tool(
    "get_sms_tag",
    "Retrieve details of a specific sms tag by ID",
    GetSmsTagSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getSmsTag({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Create SMS Tag Tool
  server.tool(
    "create_sms_tag",
    "Create a new sms tag in the JustCall account for tagging conversations",
    CreateSmsTagSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.createSmsTag({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Delete SMS Tag Tool
  server.tool(
    "delete_sms_tag",
    "Delete a specific sms tag by ID",
    DeleteSmsTagSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.deleteSmsTag({
        authToken,
        context,
        ...params,
      });
    })
  );

  // List SMS Threads Tool
  server.tool(
    "list_sms_threads",
    "Retrieve all sms threads/conversations associated with a JustCall number",
    ListSmsThreadsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listSmsThreads({
        authToken,
        ...params,
      });
    })
  );

  // Get SMS Thread Tool
  server.tool(
    "get_sms_thread",
    "Retrieve a specific sms thread/conversation by ID",
    GetSmsThreadSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getSmsThread({
        authToken,
        ...params,
      });
    })
  );

  // Add Tag to Thread Tool
  server.tool(
    "add_tag",
    "Add tag to a sms thread/conversation identified by thread ID or combination of contact number and JustCall number",
    AddTagToThreadSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.addTagToThread({
        authToken,
        ...params,
      });
    })
  );
};

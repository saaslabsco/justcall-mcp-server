import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { ListWebhooksSchema, CreateWebhookSchema } from "../../schema/index.js";

export const registerWebhookTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Webhooks Tool
  server.tool(
    "list_webhooks",
    "Retrieve all configured webhooks",
    ListWebhooksSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listWebhooks({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Create Webhook Tool
  server.tool(
    "create_webhook",
    "Create a new webhook endpoint to receive real-time notifications",
    CreateWebhookSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.createWebhook({
        authToken,
        context,
        ...params,
      });
    })
  );
};

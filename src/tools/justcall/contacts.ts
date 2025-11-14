import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { ListContactsSchema, CreateContactSchema } from "../../schema/index.js";

export const registerContactTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Contacts Tool
  server.tool(
    "list_contacts",
    "Retrieve all contacts associated with the JustCall account",
    ListContactsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listContacts({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Create Contact Tool
  server.tool(
    "create_contact",
    "Create a new contact in the JustCall account",
    CreateContactSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.createContact({
        authToken,
        context,
        ...params,
      });
    })
  );
};

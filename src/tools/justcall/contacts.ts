import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import { ListContactsSchema, CreateContactSchema } from "../../schema/index.js";

export const registerContactTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Contacts Tool
  server.tool(
    "list_contacts",
    "Retrieve all contacts from the CRM",
    ListContactsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listContacts({
        authToken,
        ...params,
      });
    })
  );

  // Create Contact Tool
  server.tool(
    "create_contact",
    "Create a new contact in the CRM",
    CreateContactSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.createContact({
        authToken,
        ...params,
      });
    })
  );
};

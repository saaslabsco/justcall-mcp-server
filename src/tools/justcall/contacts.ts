import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListContactsSchema,
  GetContactSchema,
  CreateContactSchema,
  UpdateContactSchema,
  UpdateContactStatusSchema,
  AddContactsBlacklistSchema,
} from "../../schema/index.js";

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

  // Get Contact Tool
  server.tool(
    "get_contact",
    "Retrieve detailed information for a specific contact by ID",
    GetContactSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getContact({
        authToken,
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

  // Update Contact Tool
  server.tool(
    "update_contact",
    "Update/modify details of an existing contact in the JustCall account",
    UpdateContactSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.updateContact({
        authToken,
        ...params,
      });
    })
  );

  // Update Contact Status Tool
  server.tool(
    "update_contact_status",
    "Add or remove a contact from DND/DNM/Blacklist lists in the JustCall account",
    UpdateContactStatusSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.updateContactStatus({
        authToken,
        ...params,
      });
    })
  );

  // Add Contacts to Blacklist Tool
  server.tool(
    "add_contacts_blacklist",
    "Add one or more contacts to the JustCall account's global blacklist in bulk",
    AddContactsBlacklistSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.addContactsBlacklist({
        authToken,
        ...params,
      });
    })
  );
};

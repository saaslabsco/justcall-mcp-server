import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { SalesDialerApiService } from "../../sdk/salesdialer.js";
import {
  ListSalesDialerContactsSchema,
  GetSalesDialerContactSchema,
  CreateSalesDialerContactSchema,
  UpdateSalesDialerContactSchema,
  ImportSalesDialerContactsSchema,
  ImportSalesDialerContactsStatusSchema,
  AddSalesDialerContactsDncaSchema,
  ListSalesDialerCustomFieldsSchema,
} from "../../schema/salesdialer/index.js";

export const registerSalesDialerContactTools = (server: McpServer) => {
  const salesdialerAPIservice = new SalesDialerApiService();

  // List Sales Dialer Contacts Tool
  server.tool(
    "list_salesdialer_contacts",
    "Retrieve all contacts from Sales Dialer in the JustCall account",
    ListSalesDialerContactsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.listSalesDialerContacts({
        authToken,
        ...params,
      });
    })
  );

  // Get Sales Dialer Contact Tool
  server.tool(
    "get_salesdialer_contact",
    "Retrieve detailed information for a specific contact in Sales Dialer by ID",
    GetSalesDialerContactSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.getSalesDialerContact({
        authToken,
        ...params,
      });
    })
  );

  // Create Sales Dialer Contact Tool
  server.tool(
    "create_salesdialer_contact",
    "Create a new contact in Sales Dialer",
    CreateSalesDialerContactSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.createSalesDialerContact({
        authToken,
        ...params,
      });
    })
  );

  // Update Sales Dialer Contact Tool
  server.tool(
    "update_salesdialer_contact",
    "Update/modify details of an existing contact in Sales Dialer identified by ID",
    UpdateSalesDialerContactSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.updateSalesDialerContact({
        authToken,
        ...params,
      });
    })
  );

  // Import Sales Dialer Contacts Tool
  server.tool(
    "import_salesdialer_contacts",
    "Import multiple contacts into Sales Dialer or a campaign in bulk",
    ImportSalesDialerContactsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.importSalesDialerContacts({
        authToken,
        ...params,
      });
    })
  );

  // Import Sales Dialer Contacts Status Tool
  server.tool(
    "import_salesdialer_contacts_status",
    "Check the status of a bulk import job/request by its batch ID",
    ImportSalesDialerContactsStatusSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.importSalesDialerContactsStatus({
        authToken,
        ...params,
      });
    })
  );

  // Add Sales Dialer Contacts DNCA Tool
  server.tool(
    "add_salesdialer_contacts_dnca",
    'Add one or more contacts to the Sales Dialer\'s "Do Not Call Again" list in bulk',
    AddSalesDialerContactsDncaSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.addSalesDialerContactsDnca({
        authToken,
        ...params,
      });
    })
  );

  // List Sales Dialer Custom Fields Tool
  server.tool(
    "list_salesdialer_custom_fields",
    "Fetch all custom contact fields defined in your Sales Dialer account and their details",
    ListSalesDialerCustomFieldsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.listSalesDialerCustomFields({
        authToken,
        ...params,
      });
    })
  );
};

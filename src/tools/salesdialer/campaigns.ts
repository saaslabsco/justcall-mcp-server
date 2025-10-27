import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { SalesDialerApiService } from "../../sdk/salesdialer.js";
import {
  ListCampaignsSchema,
  GetCampaignSchema,
  CreateCampaignSchema,
  UpdateCampaignSchema,
} from "../../schema/salesdialer/index.js";

export const registerCampaignTools = (server: McpServer) => {
  const salesdialerAPIservice = new SalesDialerApiService();

  // List Campaigns Tool
  server.tool(
    "list_salesdialer_campaigns",
    "Retrieve all Sales Dialer campaigns in the JustCall account",
    ListCampaignsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.listCampaigns({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Get Campaign Tool
  server.tool(
    "get_salesdialer_campaign",
    "Retrieve detailed information for a specific Sales Dialer campaign by ID",
    GetCampaignSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.getCampaign({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Create Campaign Tool
  server.tool(
    "create_salesdialer_campaign",
    "Create a new Sales Dialer campaign in the JustCall account",
    CreateCampaignSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.createCampaign({
        authToken,
        context,
        ...params,
      });
    })
  );

  // Update Campaign Tool
  server.tool(
    "update_salesdialer_campaign",
    "Update/modify details of an existing Sales Dialer campaign in the JustCall account",
    UpdateCampaignSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return salesdialerAPIservice.updateCampaign({
        authToken,
        context,
        ...params,
      });
    })
  );
};

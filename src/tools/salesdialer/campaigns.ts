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
    "list_campaigns",
    "Retrieve all sales dialer campaigns",
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
    "get_campaign",
    "Retrieve detailed information for a specific sales dialer campaign",
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
    "create_campaign",
    "Create a new sales dialer campaign",
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
    "update_campaign",
    "Update campaign details including name, description, status, and assignments",
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

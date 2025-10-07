import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerCallTools } from "./justcall/call.js";

export const registerAllTools = (server: McpServer) => {
  registerCallTools(server);
};

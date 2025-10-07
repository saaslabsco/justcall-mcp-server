import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllTools } from "./tools/index.js";

import dotenv from "dotenv";

// Cloudflare Workers types
interface Env {
  JUSTCALL_API_KEY: string;
  JUSTCALL_API_SECRET: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}
dotenv.config();

export class JustCallMCP extends McpAgent {
  server = new McpServer({
    name: "JustCall MCP",
    version: "0.0.1",
  });

  async init() {
    registerAllTools(this.server);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return JustCallMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return JustCallMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};

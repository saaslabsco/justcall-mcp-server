import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllTools } from "./tools/index.js";

import dotenv from "dotenv";
import { OAUTH2_CONFIG } from "./constants/oauth.js";

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
      try {
        checkOAuthToken(request);
        return JustCallMCP.serveSSE("/sse").fetch(request, env, ctx);
      } catch (error) {
        console.error(error);
        return new Response("Unauthorized", { status: 401 });
      }
    }

    if (url.pathname === "/mcp") {
      try {
        checkOAuthToken(request);
        return JustCallMCP.serve("/mcp").fetch(request, env, ctx);
      } catch (error) {
        console.error(error);
        return new Response("Unauthorized", { status: 401 });
      }
    }

    // Health check endpoint
    if (url.pathname === "/health") {
      return new Response("OK", { status: 200 });
    }

    // OAuth authorization server metadata
    if (url.pathname === "/.well-known/oauth-authorization-server") {
      return new Response(JSON.stringify(OAUTH2_CONFIG), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};

/**
 * Check the OAuth token from the request
 */
function checkOAuthToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Authorization header is required");
  }
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    throw new Error("Invalid authorization header");
  }
}

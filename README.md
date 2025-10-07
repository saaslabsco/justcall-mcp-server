# JustCall MCP Server

The JustCall [Model Context Protocol (MCP)](https://modelcontextprotocol.com/) Server lets Large Language Models (LLMs) and AI agents make real-world voice calls and send SMS directly through JustCall’s APIs — securely, contextually, and programmatically.

It provides a function-calling interface for conversational AI systems, enabling:
- 📞 AI-powered calling: Let your LLM initiate, manage, or transcribe calls using JustCall.
- 💬 Smart messaging: Allow your AI agent to send or respond to SMS within conversations.
- ⚙️ Seamless integration: Use the MCP standard to connect JustCall’s telephony capabilities with any LLM runtime or orchestration framework.

In short: It gives your LLMs a voice and a phone number — turning chatbots into truly conversational agents.

## Claude Desktop Setup

1. Open `Claude Desktop` and press `CMD + ,` to go to `Settings`.
2. Click on the `Developer` tab.
3. Click on the `Edit Config` button.
4. This will open the `claude_desktop_config.json` file in your file explorer.
5. Get your JustCall API Key & Secret from the JustCall dashboard (<https://app.justcall.io/app/developersApiCredentials>).
6. Add the following to your `claude_desktop_config.json` file. See [here](https://modelcontextprotocol.io/quickstart/user) for more details.
7. Restart the Claude Desktop after editing the config file.

### Remote Configuration

```json
{
  "mcpServers": {
    "JustCall-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "supergateway",
        "--streamableHttp",
        "https://mcp.justcall.host/mcp",
        "--oauth2Bearer",
        "<JUSTCALL_API_KEY>:<JUSTCALL_API_SECRET>"
      ]
    }
  }
}
```

## Remote MCP

To connect to JustCall's MCP server remotely:

### Streamable HTTP (Recommended)

The default and recommended way to connect is via Streamable HTTP Transport:

- Connect to `https://mcp.justcall.host/mcp` from any MCP client using Streamable HTTP Transport
- Include your JustCall API key as a bearer token in the request headers
- Example header: `Authorization: <JUSTCALL_API_KEY>:<JUSTCALL_API_SECRET>`

## Development

```bash
# Install dependencies
pnpm install

# Build the server
pnpm run build

# Use inspector to test the server
pnpm run inspector
```

Update your `claude_desktop_config.json` to use the mcp server.

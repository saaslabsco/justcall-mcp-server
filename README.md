# JustCall MCP Server

The JustCall [Model Context Protocol](https://modelcontextprotocol.com/) server allows you to integrate with JustCall APIs through function calling.

## Claude Desktop Setup

1. Open `Claude Desktop` and press `CMD + ,` to go to `Settings`.
2. Click on the `Developer` tab.
3. Click on the `Edit Config` button.
4. This will open the `claude_desktop_config.json` file in your file explorer.
5. Get your JustCall API key from the JustCall dashboard (<https://app.justcall.io/app/developersApiCredentials>).
6. Add the following to your `claude_desktop_config.json` file. See [here](https://modelcontextprotocol.io/quickstart/user) for more details.
7. Restart the Claude Desktop after editing the config file.

### Local Configuration

```json
{
  "mcpServers": {
    "JustCall-mcp-server": {
      "command": "npx",
      "args": [
          "-y",
          "@JustCall/mcp-server"
      ],
      "env": {
        "JUSTCALL_API_KEY": "<JUSTCALL_API_KEY>",
        "JUSTCALL_API_SECRET": "<JUSTCALL_API_SECRET>"
      }
    }
  }
}
```

### Remote Configuration

```json
{
  "mcpServers": {
    "JustCall-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.justcall.io/mcp",
        "--header",
        "Authorization: Bearer ${JustCall_TOKEN}"
      ],
      "env": {
        "JUSTCALL_API_KEY": "<JUSTCALL_API_KEY>",
        "JUSTCALL_API_SECRET": "<JUSTCALL_API_SECRET>"
      }
    }
  }
}
```

## Remote MCP

To connect to JustCall's MCP server remotely:

### Streamable HTTP (Recommended)

The default and recommended way to connect is via Streamable HTTP Transport:

- Connect to `https://mcp.justcall.io/mcp` from any MCP client using Streamable HTTP Transport
- Include your JustCall API key as a bearer token in the request headers
- Example header: `Authorization: JUSTCALL_API_KEY:JUSTCALL_API_SECRET`

## Development

```bash
# Install dependencies
npm install

# Build the server
npm run build

# Use inspector to test the server
npm run inspector
```

Update your `claude_desktop_config.json` to use the local server.

```json
{
  "mcpServers": {
    "justcall-local": {
      "command": "node",
      "args": [
        "<path_to_justcall_mcp_server>/dist/index.js"
      ],
      "env": {
        "JUSTCALL_API_KEY": "<JUSTCALL_API_KEY>",
        "JUSTCALL_API_SECRET": "<JUSTCALL_API_SECRET>"
      }
    },
  }
}
```
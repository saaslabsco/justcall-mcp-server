# JustCall MCP Server

The JustCall [Model Context Protocol (MCP)](https://modelcontextprotocol.com/) Server lets Large Language Models (LLMs) and AI agents make real-world voice calls and send SMS directly through JustCall’s APIs — securely, contextually, and programmatically.

It provides a function-calling interface for conversational AI systems, enabling:

- 📞 AI-powered calling: Let your LLM initiate, manage, or transcribe calls using JustCall.
- 💬 Smart messaging: Allow your AI agent to send or respond to SMS within conversations.
- ⚙️ Seamless integration: Use the MCP standard to connect JustCall’s telephony capabilities with any LLM runtime or orchestration framework.

In short: It gives your LLMs a voice and a phone number — turning chatbots into truly conversational agents.

### 🧩 Prerequisites

This project requires **Node.js** (which includes `npm` and `npx`).

#### Installing Node.js

- Visit the official Node.js website:
  👉 [https://nodejs.org/en/download](https://nodejs.org/en/download)
- Download and install the **LTS (Long-Term Support)** version for your platform (Windows, macOS, or Linux).

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

## Available Tools

The JustCall MCP Server provides 29 tools organized into the following categories:

### 📞 Calls (5 tools)
- **list_calls** - Lists all JustCall calls with various filtering options
- **get_call** - Get a specific JustCall call by ID
- **update_call** - Update a JustCall call (disposition, notes, rating)
- **get_call_journey** - Get call journey details
- **get_voice_agent_data** - Get voice agent data for a specific call

### 👥 Users & Agents (2 tools)
- **list_users** - List all users/agents in the account
- **get_user** - Get detailed information for a specific user/agent

### 💬 SMS & Messaging (8 tools)
- **send_sms** - Send an SMS/text message to a contact
- **list_sms** - Retrieve all SMS/text messages
- **get_sms** - Get detailed information for a specific SMS/text message
- **check_sms_reply** - Check for the most recent inbound SMS reply from a specific contact
- **list_sms_tags** - Retrieve all SMS tags used for organizing text messages
- **get_sms_tag** - Get detailed information for a specific SMS tag
- **create_sms_tag** - Create a new tag for organizing SMS conversations
- **delete_sms_tag** - Delete a specific SMS tag

### 📇 Contacts (2 tools)
- **list_contacts** - Retrieve all contacts from the CRM
- **create_contact** - Create a new contact in the CRM

### 📊 Analytics (4 tools)
- **get_agent_analytics** - Retrieve agent analytics data for specified date range
- **get_account_analytics** - Retrieve account analytics data for specified date range
- **get_number_analytics** - Retrieve number analytics data for specified date range
- **get_sales_dialer_analytics** - Retrieve comprehensive analytics data for sales dialer campaigns

### 🔔 Webhooks (2 tools)
- **list_webhooks** - Retrieve all configured webhooks
- **create_webhook** - Create a new webhook endpoint to receive real-time notifications

### 📱 Phone Numbers (2 tools)
- **list_numbers** - Retrieve all JustCall phone numbers
- **get_number** - Retrieve detailed information for a specific JustCall phone number

### 📢 Sales Dialer Campaigns (4 tools)
- **list_campaigns** - Retrieve all sales dialer campaigns
- **get_campaign** - Retrieve detailed information for a specific sales dialer campaign
- **create_campaign** - Create a new sales dialer campaign
- **update_campaign** - Update campaign details including name, description, status, and assignments

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

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

The JustCall MCP Server provides 66 tools organized into the following categories:

### JustCall API Tools

#### 📞 Calls (6 tools)

- **list_calls** - Lists all JustCall calls with various filtering options
- **get_call** - Get a specific JustCall call by ID
- **update_call** - Update a JustCall call (disposition, notes, rating)
- **get_call_journey** - Fetch the sequence of events for a specific call
- **get_voice_agent_data** - Get voice agent data for a specific call (deprecated, use get_voice_agent_call)
- **get_voice_agent_call** - Retrieve voice agent related data for a specific call

#### 👥 Users & Agents (3 tools)

- **list_users** - List all users/agents in the account
- **get_user** - Get detailed information for a specific user/agent
- **update_user_availability** - Update a user's availability status to available or unavailable for calls

#### 💬 SMS & Messaging (11 tools)

- **send_sms** - Send an SMS/text message to a contact
- **list_sms** - Retrieve all SMS/text messages
- **get_sms** - Get detailed information for a specific SMS/text message
- **check_sms_reply** - Check for the most recent inbound SMS reply from a specific contact
- **list_sms_tags** - Retrieve all SMS tags used for organizing text messages
- **get_sms_tag** - Get detailed information for a specific SMS tag
- **create_sms_tag** - Create a new tag for organizing SMS conversations
- **delete_sms_tag** - Delete a specific SMS tag
- **list_sms_threads** - Retrieve all SMS threads/conversations associated with a JustCall number
- **get_sms_thread** - Retrieve a specific SMS thread/conversation by ID
- **add_sms_thread_tag** - Add tag to an SMS thread/conversation

#### 📇 Contacts (6 tools)

- **list_contacts** - Retrieve all contacts from the CRM
- **get_contact** - Retrieve detailed information for a specific contact by ID
- **create_contact** - Create a new contact in the CRM
- **update_contact** - Update/modify details of an existing contact
- **update_contact_status** - Add or remove a contact from DND/DNM/Blacklist lists
- **add_contacts_blacklist** - Add one or more contacts to the global blacklist in bulk

#### 📊 Analytics (4 tools)

- **get_agent_analytics** - Retrieve agent analytics data for specified date range
- **get_account_analytics** - Retrieve account analytics data for specified date range
- **get_number_analytics** - Retrieve number analytics data for specified date range
- **get_sales_dialer_analytics** - Retrieve comprehensive analytics data for sales dialer campaigns

#### 🔔 Webhooks (2 tools)

- **list_webhooks** - Retrieve all configured webhooks
- **create_webhook** - Create a new webhook endpoint to receive real-time notifications

#### 📱 Phone Numbers (2 tools)

- **list_numbers** - Retrieve all JustCall phone numbers
- **get_number** - Retrieve detailed information for a specific JustCall phone number

#### 👥 User Groups (2 tools)

- **list_user_groups** - Retrieve all user groups defined in the account
- **get_user_group** - Retrieve detailed information for a specific user group by ID

#### 📅 Appointments (3 tools)

- **list_appointment_slots** - Retrieve all available time slots for appointments on a specific calendar
- **create_appointment** - Schedule a new appointment on a specific calendar
- **get_appointment** - Retrieve details of a specific appointment by its ID

#### 💚 WhatsApp (5 tools)

- **list_whatsapp_messages** - Retrieve all WhatsApp messages associated with the account
- **get_whatsapp_message** - Retrieve detailed information for a specific WhatsApp message by ID
- **send_whatsapp_message** - Send a new WhatsApp message to a contact number
- **list_whatsapp_templates** - Retrieve all WhatsApp message templates available in the account
- **check_whatsapp_message_reply** - Check for the most recent inbound WhatsApp message from a contact

#### 🤖 AI Analysis (4 tools)

- **list_calls_ai_analysis** - Retrieve AI-generated analysis (transcription, summary, insights) for all calls
- **get_call_ai_analysis** - Retrieve AI-generated analysis for a specific call by Call ID
- **list_meetings_ai_analysis** - Retrieve AI-generated analysis for recorded meetings (Zoom, Google Meet)
- **get_meeting_ai_analysis** - Retrieve AI-generated analysis for a specific meeting by Instance ID

#### 🎙️ Voice Agents (2 tools)

- **list_voice_agents** - Retrieve all AI voice agents associated with the account
- **create_voice_agent_call** - Initiate an outbound call from a configured AI voice agent to a contact

### Sales Dialer Tools

#### 📢 Campaigns (6 tools)

- **list_campaigns** - Retrieve all sales dialer campaigns
- **get_campaign** - Retrieve detailed information for a specific sales dialer campaign
- **create_campaign** - Create a new sales dialer campaign
- **update_campaign** - Update campaign details including name, description, status, and assignments
- **list_salesdialer_campaign_contacts** - Retrieve all contacts in a specific campaign
- **add_salesdialer_campaign_contact** - Add contact to a specific campaign

#### 👥 Contacts (8 tools)

- **list_salesdialer_contacts** - Retrieve all contacts from Sales Dialer
- **get_salesdialer_contact** - Retrieve detailed information for a specific contact by ID
- **create_salesdialer_contact** - Create a new contact in Sales Dialer
- **update_salesdialer_contact** - Update/modify details of an existing contact
- **import_salesdialer_contacts** - Import multiple contacts into Sales Dialer or a campaign in bulk
- **import_salesdialer_contacts_status** - Check the status of a bulk import job by batch ID
- **add_salesdialer_contacts_dnca** - Add one or more contacts to the "Do Not Call Again" list in bulk
- **list_salesdialer_custom_fields** - Fetch all custom contact fields defined in Sales Dialer

#### 📞 Calls (2 tools)

- **list_salesdialer_calls** - Retrieve all calls made via the Sales Dialer
- **get_salesdialer_call** - Retrieve detailed information for a specific Sales Dialer call by ID

#### 📊 Analytics (2 tools)

- **get_sales_dialer_analytics** - Retrieve comprehensive analytics data for sales dialer campaigns
- **get_salesdialer_agent_analytics** - Retrieve call performance analytics of a specific agent for a campaign

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

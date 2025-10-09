# @justcall/mcp-server

## 0.0.6

### Patch Changes

- fix: Correct phone numbers and contacts update endpoint URLs

## 0.0.5

### Patch Changes

- fix: Align API parameters with JustCall Developer API specification

## 0.0.4

### Patch Changes

- 37b3c39: Publish to MCP official registry and add server.json

## 0.0.3

### Patch Changes

- Add tools for Account and number analytics
- New tools for retrieving account-level analytics data
- Enhanced analytics capabilities for tracking number-specific metrics
- Improved analytics DTO and schema structure for better type safety
- Enhanced SDK with additional analytics endpoints

## 0.0.2

### Patch Changes

- Add comprehensive MCP tools for JustCall and SalesDialer APIs
- 20+ API endpoints across JustCall and SalesDialer
- Call management: List, get, update calls, track call journeys, and voice agent interactions
- Contact management: Full CRUD operations (list, get, create, update)
- SMS operations: Send SMS, list messages, get message details, check replies, manage tags
- User management: Complete user operations (list, get, create, update)
- Number management: Tools to list and retrieve phone numbers
- Webhook management: Create and list webhooks for event notifications
- Analytics: Agent performance analytics and SalesDialer campaign analytics
- Campaign management: Full campaign operations (list, get, create, update)
- Restructured project with organized DTO structure
- Implemented Zod schemas for robust input validation
- Added SDK services (JustCallApiService, SalesDialerApiService, BaseApiService)
- Enhanced type safety and error handling across all API endpoints

## 0.0.1

### Patch Changes

- Initial release of JustCall MCP Server
- Basic server setup with Model Context Protocol support
- Initial call listing functionality
- Docker configuration for containerized deployment
- Cloudflare Workers support for edge deployment
- Environment-based configuration with dotenv

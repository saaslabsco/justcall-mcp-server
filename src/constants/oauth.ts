const devApiOauth2Url = "https://api.justcall.io/v2.1/oauth";
const mcpOauth2Url = "https://app.justcall.io/apex";

export const OAUTH2_CONFIG = {
  issuer: devApiOauth2Url,
  authorization_endpoint: `${mcpOauth2Url}/mcp`,
  registration_endpoint: `${devApiOauth2Url}/register`,
  token_endpoint: `${devApiOauth2Url}/token`,
  response_types_supported: ["code"],
  grant_types_supported: ["authorization_code"],
  token_endpoint_auth_methods_supported: ["client_secret_post"],
  scopes_supported: ["openid"],
  response_modes_supported: ["query"],
  code_challenge_methods_supported: ["S256"],
};

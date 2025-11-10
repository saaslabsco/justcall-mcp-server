import { Axios, AxiosResponse } from "axios";
import * as packageJson from "../../package.json";

const version = packageJson.default.version;
export abstract class BaseApiService {
  private readonly SERVER_NAME = "JustCall-MCP-Server";

  constructor(protected readonly httpService: Axios) {}

  protected abstract getServiceName(): string;

  /**
   * Build a user-agent string that includes both server and client information
   * @param context - The context from the MCP request
   * @returns The user-agent string
   */
  protected buildUserAgent(context?: any): string {
     // Try to get client info from MCP context
     const clientInfo = context?.meta?.clientInfo || context?.clientInfo;
    
     if (clientInfo) {
       const clientName = clientInfo.name || 'Unknown';
       const clientVersion = clientInfo.version || '';
       
       // Build platform info (e.g., "darwin arm64")
       let platformInfo = '';
       if (clientInfo.platform) {
         const platform = clientInfo.platform.os || '';
         const arch = clientInfo.platform.arch || '';
         platformInfo = [platform, arch].filter(Boolean).join(' ');
       }
       
       // Format: JustCall-MCP-Server/0.0.7 (Client: Cursor/1.7.46 (darwin arm64))
       let clientStr = clientName;
       if (clientVersion) {
         clientStr += `/${clientVersion}`;
       }
       if (platformInfo) {
         clientStr += ` (${platformInfo})`;
       }
       
       return `${this.SERVER_NAME}/${version} (Client: ${clientStr})`;
     }
     
     // Fallback to user-agent header if clientInfo not available
    const userAgent = context?.requestInfo?.headers?.["user-agent"];
    if (userAgent) {
      return `${this.SERVER_NAME}/${version} (Client: ${userAgent})`;
    }

    // Default fallback
    return `${this.SERVER_NAME}/${version}`;
  }

  protected async executeApiCall<T>(
    url: string,
    options?: {
      params?: Record<string, any>;
      headers?: Record<string, any>;
      method?: "GET" | "POST" | "PUT" | "DELETE";
      data?: any;
      context?: any; // MCP context for client identification
    }
  ): Promise<T> {
    const method = options?.method || "GET";
    const httpOptions = {
      params: options?.params,
      headers: {
        ...options?.headers,
        "x-justcall-client": this.buildUserAgent(options?.context),
      },
      timeout: 60000, // 1 minute fallback timeout
    };

    let httpRequest: Promise<AxiosResponse<T>>;

    switch (method) {
      case "POST":
        httpRequest = this.httpService.post(url, options?.data, httpOptions);
        break;
      case "PUT":
        httpRequest = this.httpService.put(url, options?.data, httpOptions);
        break;
      case "DELETE":
        httpRequest = this.httpService.delete(url, httpOptions);
        break;
      case "GET":
      default:
        httpRequest = this.httpService.get(url, httpOptions);
        break;
    }

    const response = await httpRequest;
    return response.data;
  }
}

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

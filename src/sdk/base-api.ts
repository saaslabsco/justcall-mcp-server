import { Axios, AxiosResponse } from 'axios';

export interface ApiOperationContext {
  operationName: string;
  serviceName: string;
  logContext: Record<string, any>;
  spanAttributes: Record<string, any>;
}

export abstract class BaseApiService {

  constructor(
    protected readonly httpService: Axios,
  ) {
  }

  protected abstract getServiceName(): string;

  protected async executeApiCall<T>(
    url: string,
    context: ApiOperationContext,
    options?: {
      params?: Record<string, any>;
      headers?: Record<string, any>;
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      data?: any;
    }
  ): Promise<T> {
    // Start telemetry span
    // Log operation start
    const operationDisplayName = this.getOperationDisplayName(context.operationName);
    console.log(`Starting ${operationDisplayName}`, {
      operation: context.operationName,
      ...context.logContext,
    });

    // Log request details (with sensitive data redacted)
    const logHeaders = options?.headers ? this.redactSensitiveHeaders(options.headers) : {};
    const requestLogMessage = this.getRequestLogMessage(context.operationName);
    console.log(requestLogMessage, {
      url,
      params: options?.params,
      headers: logHeaders,
    });

    const method = options?.method || 'GET';
    const httpOptions = {
      params: options?.params,
      headers: options?.headers,
      timeout: 25000, // 25 seconds fallback timeout
    };

    let httpRequest: Promise<AxiosResponse<T>>;

    switch (method) {
      case 'POST':
        httpRequest = this.httpService.post(url, options?.data, httpOptions);
        break;
      case 'PUT':
        httpRequest = this.httpService.put(url, options?.data, httpOptions);
        break;
      case 'DELETE':
        httpRequest = this.httpService.delete(url, httpOptions);
        break;
      case 'GET':
      default:
        httpRequest = this.httpService.get(url, httpOptions);
        break;
    }

    const response = await httpRequest;
    console.log(`${operationDisplayName} successful`, {
      operation: context.operationName,
      ...context.logContext,
      statusCode: response.status,
    });
    return response.data;
  }
  
  private redactSensitiveHeaders(headers: Record<string, any>): Record<string, any> {
    const redacted = { ...headers };
    const sensitiveKeys = ['X-Internal-Auth-Key', 'Authorization', 'auth-token'];

    for (const key of sensitiveKeys) {
      if (redacted[key]) {
        redacted[key] = '[REDACTED]';
      }
    }

    return redacted;
  }

  private getOperationDisplayName(operationName: string): string {
    const displayNames: Record<string, string> = {
      'get_last_conversation': 'last conversation retrieval',
      'search_contact': 'contact search',
    };

    return displayNames[operationName] || operationName.replaceAll('_', ' ');
  }

  private getRequestLogMessage(operationName: string): string {
    const requestMessages: Record<string, string> = {
      'get_last_conversation': 'Making request to JustCall API',
      'search_contact': 'URL',
    };

    return requestMessages[operationName] || 'Making API request';
  }
}

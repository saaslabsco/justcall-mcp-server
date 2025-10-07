import { Axios, AxiosResponse } from "axios";

export abstract class BaseApiService {
  constructor(protected readonly httpService: Axios) {}

  protected abstract getServiceName(): string;

  protected async executeApiCall<T>(
    url: string,
    options?: {
      params?: Record<string, any>;
      headers?: Record<string, any>;
      method?: "GET" | "POST" | "PUT" | "DELETE";
      data?: any;
    }
  ): Promise<T> {
    const method = options?.method || "GET";
    const httpOptions = {
      params: options?.params,
      headers: options?.headers,
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

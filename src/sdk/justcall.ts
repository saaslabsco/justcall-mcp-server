import { ListCallsDto } from "./dto.js";
import { BaseApiService } from "./base-api.js";
import axios from "axios";

export class JustCallApiService extends BaseApiService {
  constructor() {
    super(
      axios.create({
        baseURL: "https://api.justcall.io",
        timeout: 60000,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }

  protected getServiceName(): string {
    return "justcall-api-service";
  }

  private getAuthHeaders(token: string) {
    return {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
  }

  // Calls Endpoints
  listCalls(dto: ListCallsDto): Promise<any> {
    const { authToken, ...queryParams } = dto;

    // Build query parameters
    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = value;
        } else {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }
}

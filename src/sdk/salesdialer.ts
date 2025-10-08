import {
  ListCampaignsDto,
  GetCampaignDto,
  CreateCampaignDto,
  UpdateCampaignDto,
  GetSalesDialerAnalyticsDto,
} from "../dto/salesdialer/index.js";
import { BaseApiService } from "./base-api.js";
import axios from "axios";

export class SalesDialerApiService extends BaseApiService {
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
    return "salesdialer-api-service";
  }

  private getAuthHeaders(token: string) {
    return {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
  }

  // Sales Dialer Analytics Endpoint
  getSalesDialerAnalytics(dto: GetSalesDialerAnalyticsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

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

    const url = `/v2.1/sales_dialer/analytics`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  // Campaign Endpoints
  listCampaigns(dto: ListCampaignsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/sales_dialer/campaigns`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  getCampaign(dto: GetCampaignDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/sales_dialer/campaigns/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  createCampaign(dto: CreateCampaignDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/campaigns`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
    });
  }

  updateCampaign(dto: UpdateCampaignDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/campaigns/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "PUT",
      data: requestBody,
    });
  }
}

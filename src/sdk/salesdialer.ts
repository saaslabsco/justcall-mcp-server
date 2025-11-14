import {
  ListCampaignsDto,
  GetCampaignDto,
  CreateCampaignDto,
  UpdateCampaignDto,
  ListCampaignContactsDto,
  AddContactToCampaignDto,
  GetSalesDialerAnalyticsDto,
  // Contacts DTOs
  ListSalesDialerContactsDto,
  GetSalesDialerContactDto,
  CreateSalesDialerContactDto,
  UpdateSalesDialerContactDto,
  ImportSalesDialerContactsDto,
  ImportSalesDialerContactsStatusDto,
  AddSalesDialerContactsDncaDto,
  ListSalesDialerCustomFieldsDto,
  // Calls DTOs
  ListSalesDialerCallsDto,
  GetSalesDialerCallDto,
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
  getSalesDialerAnalytics(
    dto: GetSalesDialerAnalyticsDto & { context?: any }
  ): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

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

    return this.executeApiCall(url, { params, headers, context });
  }

  // Campaign Endpoints
  listCampaigns(dto: ListCampaignsDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/sales_dialer/campaigns`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  getCampaign(dto: GetCampaignDto & { context?: any }): Promise<any> {
    const { companyId, authToken, id, context } = dto;

    const url = `/v2.1/sales_dialer/campaigns/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }

  createCampaign(dto: CreateCampaignDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/campaigns`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
      context,
    });
  }

  updateCampaign(dto: UpdateCampaignDto & { context?: any }): Promise<any> {
    const { companyId, authToken, id, context, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/campaigns/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "PUT",
      data: requestBody,
      context,
    });
  }

  // Campaign Contacts Endpoints
  listCampaignContacts(dto: ListCampaignContactsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/sales_dialer/campaigns/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  addContactToCampaign(dto: AddContactToCampaignDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/campaigns/contact`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
    });
  }

  // Sales Dialer Contacts Endpoints
  listSalesDialerContacts(dto: ListSalesDialerContactsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/sales_dialer/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  getSalesDialerContact(dto: GetSalesDialerContactDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/sales_dialer/contacts/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  createSalesDialerContact(dto: CreateSalesDialerContactDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
    });
  }

  updateSalesDialerContact(dto: UpdateSalesDialerContactDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/contacts/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "PUT",
      data: requestBody,
    });
  }

  importSalesDialerContacts(dto: ImportSalesDialerContactsDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/contacts/bulk_import`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
    });
  }

  importSalesDialerContactsStatus(
    dto: ImportSalesDialerContactsStatusDto
  ): Promise<any> {
    const { companyId, authToken, batch_id } = dto;

    const url = `/v2.1/sales_dialer/contacts/bulk_import/status/${batch_id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  addSalesDialerContactsDnca(dto: AddSalesDialerContactsDncaDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `/v2.1/sales_dialer/contacts/bulk-add-dnca`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
    });
  }

  listSalesDialerCustomFields(
    dto: ListSalesDialerCustomFieldsDto
  ): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/sales_dialer/contacts/custom-fields`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  // Sales Dialer Calls Endpoints
  listSalesDialerCalls(dto: ListSalesDialerCallsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        if (typeof value === "boolean") {
          acc[key] = value.toString();
        } else {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/sales_dialer/calls`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  getSalesDialerCall(dto: GetSalesDialerCallDto): Promise<any> {
    const { companyId, authToken, id, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/sales_dialer/calls/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }
}

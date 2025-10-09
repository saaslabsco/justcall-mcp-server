import {
  ListCallsDto,
  GetCallDto,
  UpdateCallDto,
  GetCallJourneyDto,
  ListUsersDto,
  GetUserDto,
  ListContactsDto,
  GetContactDto,
  CreateContactDto,
  UpdateContactDto,
  ListSmsDto,
  SendSmsDto,
  GetSmsDto,
  CheckSmsReplyDto,
  ListNumbersDto,
  GetNumberDto,
  // Webhook DTOs
  ListWebhooksDto,
  CreateWebhookDto,
  // User Groups DTOs
  GetVoiceAgentDto,
  // SMS Tags DTOs
  ListSmsTagsDto,
  GetSmsTagDto,
  CreateSmsTagDto,
  DeleteSmsTagDto,
  // Analytics DTOs
  GetAgentAnalyticsDto,
  GetAccountAnalyticsDto,
  GetNumberAnalyticsDto,
} from "../dto/justcall/index.js";
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

  getCall(dto: GetCallDto): Promise<any> {
    const { companyId, authToken, id, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  updateCall(dto: UpdateCallDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `/v2.1/calls/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "PUT",
      data: requestBody,
    });
  }

  getCallJourney(dto: GetCallJourneyDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/calls/${id}/journey`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  // Users/Agents Endpoints
  listUsers(dto: ListUsersDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/users`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  getUser(dto: GetUserDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/users/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  // Contacts Endpoints
  listContacts(dto: ListContactsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  getContact(dto: GetContactDto): Promise<any> {
    const { authToken, id } = dto;

    const url = `/v2.1/contacts/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  createContact(dto: CreateContactDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `/v2.1/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
    });
  }

  updateContact(dto: UpdateContactDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `/v2.1/contacts/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "PUT",
      data: requestBody,
    });
  }

  // SMS/Text Messages Endpoints
  listSms(dto: ListSmsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/texts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  sendSms(dto: SendSmsDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    // Transform field names to match JustCall API expectations
    const transformedRequestBody = {
      contact_number: requestBody.to,
      justcall_number: requestBody.from,
      body: requestBody.body,
      media_urls: requestBody.media_urls,
    };
    const url = `/v2.1/texts/new`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: transformedRequestBody,
    });
  }

  getSms(dto: GetSmsDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/texts/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  checkSmsReply(dto: CheckSmsReplyDto): Promise<any> {
    const { companyId, authToken, ...bodyParams } = dto;

    const url = `/v2.1/texts/checkreply`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      method: "POST",
      headers,
      data: bodyParams,
    });
  }

  // Numbers Endpoints
  listNumbers(dto: ListNumbersDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/numbers`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  getNumber(dto: GetNumberDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/numbers/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  // Teams Endpoints
  // Webhook Endpoints
  listWebhooks(dto: ListWebhooksDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/webhooks`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  createWebhook(dto: CreateWebhookDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `/v2.1/webhooks`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
    });
  }

  // Voicemail Endpoints
  // IVR Endpoints
  // Conference Endpoints
  // Call Queue Endpoints

  // SMS Tags Endpoints
  listSmsTags(dto: ListSmsTagsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/texts/tags`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers });
  }

  getSmsTag(dto: GetSmsTagDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/texts/tags/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }

  createSmsTag(dto: CreateSmsTagDto): Promise<any> {
    const { companyId, authToken, color, ...requestBody } = dto;

    // Transform color to color_code for the API
    const apiRequestBody = {
      ...requestBody,
      color_code: color,
    };

    const url = `/v2.1/texts/tags`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: apiRequestBody,
    });
  }

  deleteSmsTag(dto: DeleteSmsTagDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `/v2.1/texts/tags/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "DELETE",
    });
  }

  // Additional Team Endpoints
  // deleteTeam method removed per user request

  // deleteContact method removed per user request

  // Additional Webhook Endpoints
  // deleteWebhook method removed per user request
  // deleteNumber method removed per user request

  // Additional Conference Endpoints
  // deleteConference method removed per user request

  // deleteRecording method removed per user request

  // Call Tags Endpoints

  // Agent Analytics Endpoints
  getAgentAnalytics(dto: GetAgentAnalyticsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls/analytics/agent`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      params,
    });
  }

  /**
   * Get account analytics
   * @param dto - GetAccountAnalyticsDto
   * @returns Promise<any>
   */
  getAccountAnalytics(dto: GetAccountAnalyticsDto): Promise<any> {
    const { authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls/analytics/account`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, params });
  }

  getNumberAnalytics(dto: GetNumberAnalyticsDto): Promise<any> {
    const { authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls/analytics/number`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, params });
  }

  /**
   * Get voice agent data
   * @param dto
   * @returns
   */
  getVoiceAgentData(dto: GetVoiceAgentDto): Promise<any> {
    const { authToken, id } = dto;

    const url = `/v2.1/calls/${id}/voice-agent`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers });
  }
}

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
  listCalls(dto: ListCallsDto & { context?: any }): Promise<any> {
    const { authToken, context, ...queryParams } = dto;

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

    return this.executeApiCall(url, { params, headers, context });
  }

  getCall(dto: GetCallDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, id, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  updateCall(dto: UpdateCallDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, id, ...requestBody } = dto;

    const url = `/v2.1/calls/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "PUT",
      data: requestBody,
      context,
    });
  }

  getCallJourney(dto: GetCallJourneyDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, id } = dto;

    const url = `/v2.1/calls/${id}/journey`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }

  // Users/Agents Endpoints
  listUsers(dto: ListUsersDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/users`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  getUser(dto: GetUserDto & { context?: any }): Promise<any> {
    const { companyId, authToken, id, context } = dto;

    const url = `/v2.1/users/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }

  // Contacts Endpoints
  listContacts(dto: ListContactsDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  getContact(dto: GetContactDto & { context?: any }): Promise<any> {
    const { authToken, id, context } = dto;

    const url = `/v2.1/contacts/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }

  createContact(dto: CreateContactDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...requestBody } = dto;

    const url = `/v2.1/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
      context,
    });
  }

  updateContact(dto: UpdateContactDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...requestBody } = dto;

    const url = `/v2.1/contacts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "PUT",
      data: requestBody,
      context,
    });
  }

  // SMS/Text Messages Endpoints
  listSms(dto: ListSmsDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/texts`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  sendSms(dto: SendSmsDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...requestBody } = dto;

    const url = `/v2.1/texts/new`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
      context,
    });
  }

  getSms(dto: GetSmsDto & { context?: any }): Promise<any> {
    const { companyId, authToken, id, context } = dto;

    const url = `/v2.1/texts/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }

  checkSmsReply(dto: CheckSmsReplyDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...bodyParams } = dto;

    const url = `/v2.1/texts/checkreply`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      method: "POST",
      headers,
      data: bodyParams,
      context,
    });
  }

  // Numbers Endpoints
  listNumbers(dto: ListNumbersDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/phone-numbers`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  getNumber(dto: GetNumberDto & { context?: any }): Promise<any> {
    const { companyId, authToken, id, context } = dto;

    const url = `/v2.1/phone-numbers/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }

  // Teams Endpoints
  // Webhook Endpoints
  listWebhooks(dto: ListWebhooksDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/webhooks`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  createWebhook(dto: CreateWebhookDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...requestBody } = dto;

    const url = `/v2.1/webhooks`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
      context,
    });
  }

  // Voicemail Endpoints
  // IVR Endpoints
  // Conference Endpoints
  // Call Queue Endpoints

  // SMS Tags Endpoints
  listSmsTags(dto: ListSmsTagsDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/texts/tags`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { params, headers, context });
  }

  getSmsTag(dto: GetSmsTagDto & { context?: any }): Promise<any> {
    const { companyId, authToken, id, context } = dto;

    const url = `/v2.1/texts/tags/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }

  createSmsTag(dto: CreateSmsTagDto & { context?: any }): Promise<any> {
    const { companyId, authToken, context, ...requestBody } = dto;

    const url = `/v2.1/texts/tags`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "POST",
      data: requestBody,
      context,
    });
  }

  deleteSmsTag(dto: DeleteSmsTagDto & { context?: any }): Promise<any> {
    const { companyId, authToken, id, context } = dto;

    const url = `/v2.1/texts/tags/${id}`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, {
      headers,
      method: "DELETE",
      context,
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
  getAgentAnalytics(
    dto: GetAgentAnalyticsDto & { context?: any }
  ): Promise<any> {
    const { companyId, authToken, context, ...queryParams } = dto;

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
      context,
    });
  }

  /**
   * Get account analytics
   * @param dto - GetAccountAnalyticsDto
   * @returns Promise<any>
   */
  getAccountAnalytics(
    dto: GetAccountAnalyticsDto & { context?: any }
  ): Promise<any> {
    const { authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls/analytics/account`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, params, context });
  }

  getNumberAnalytics(
    dto: GetNumberAnalyticsDto & { context?: any }
  ): Promise<any> {
    const { authToken, context, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    const url = `/v2.1/calls/analytics/number`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, params, context });
  }

  /**
   * Get voice agent data
   * @param dto
   * @returns
   */
  getVoiceAgentData(dto: GetVoiceAgentDto & { context?: any }): Promise<any> {
    const { authToken, context, id } = dto;

    const url = `/v2.1/calls/${id}/voice-agent`;
    const headers = this.getAuthHeaders(authToken as string);

    return this.executeApiCall(url, { headers, context });
  }
}

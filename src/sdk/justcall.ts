import {
  ListCallsDto,
  GetCallDto,
  UpdateCallDto,
  GetCallJourneyDto,
  CreateAppointmentDto,
  GetAvailableSlotsDto,
  ListUsersDto,
  GetUserDto,
  CreateUserDto,
  UpdateUserDto,
  ListContactsDto,
  GetContactDto,
  CreateContactDto,
  UpdateContactDto,
  ListSmsDto,
  SendSmsDto,
  GetSmsDto,
  ListNumbersDto,
  GetNumberDto,
  UpdateNumberDto,
  ListTeamsDto,
  GetTeamDto,
  CreateTeamDto,
  ListRecordingsDto,
  GetRecordingDto,
  GetAnalyticsDto,
  // Sales Dialer DTOs
  GetSalesDialerAnalyticsDto,
  ListCampaignsDto,
  GetCampaignDto,
  CreateCampaignDto,
  // Webhook DTOs
  ListWebhooksDto,
  GetWebhookDto,
  CreateWebhookDto,
  UpdateWebhookDto,
  // IVR DTOs
  ListIvrDto,
  GetIvrDto,
  // Conference DTOs
  ListConferencesDto,
  GetConferenceDto,
  CreateConferenceDto,
  // Voicemail DTOs
  ListVoicemailsDto,
  GetVoicemailDto,
  UpdateVoicemailDto,
  // Call Queue DTOs
  ListCallQueuesDto,
  GetCallQueueDto,
  GetCallQueueStatsDto,
  // User Groups DTOs
  ListUserGroupsDto,
  GetUserGroupDto,
  // Additional Appointment DTOs
  GetAppointmentDto,
  // SMS Tags DTOs
  ListSmsTagsDto,
  CreateSmsTagDto,
  // Additional Team DTOs
  UpdateTeamDto,
  // Additional Number DTOs
  CreateNumberDto,
  // Additional Campaign DTOs
  UpdateCampaignDto,
  // Additional Conference DTOs
  UpdateConferenceDto,
  // Additional DTOs for missing endpoints
  ListCallTagsDto,
  CreateCallTagDto,
  GetNumberAnalyticsDto,
  ListAppointmentsDto,
  UpdateAppointmentDto,
  CreateUserGroupDto,
  UpdateUserGroupDto,
  GetAgentAnalyticsDto,
} from './dto.js';
import { BaseApiService } from './base-api.js';
import { Axios } from 'axios';

export class JustCallApiService extends BaseApiService {
  private readonly baseUrl = process.env.JUSTCALL_API_BASE_URL;
  private readonly authToken = process.env.JUSTCALL_INTERNAL_AUTH_KEY;

  constructor(
    protected readonly httpService: Axios,
  ) {
    super(httpService);
  }

  protected getServiceName(): string {
    return 'justcall-api-service';
  }

  private getAuthHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  // Calls Endpoints
  listCalls(dto: ListCallsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

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

    const url = `${this.baseUrl}/v2.1/calls`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_calls',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_calls',
        'justcall.company_id': companyId,
        'justcall.params_count': Object.keys(params).length,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getCall(dto: GetCallDto): Promise<any> {
    const { companyId, authToken, id, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/calls/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_call',
      serviceName: 'justcall-api-service',
      logContext: { companyId, callId: id },
      spanAttributes: {
        'justcall.operation': 'get_call',
        'justcall.company_id': companyId,
        'justcall.call_id': id,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  updateCall(dto: UpdateCallDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/calls/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_call',
      serviceName: 'justcall-api-service',
      logContext: { companyId, callId: id },
      spanAttributes: {
        'justcall.operation': 'update_call',
        'justcall.company_id': companyId,
        'justcall.call_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  getCallJourney(dto: GetCallJourneyDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/calls/${id}/journey`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_call_journey',
      serviceName: 'justcall-api-service',
      logContext: { companyId, callId: id },
      spanAttributes: {
        'justcall.operation': 'get_call_journey',
        'justcall.company_id': companyId,
        'justcall.call_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  // Appointments Endpoints
  createAppointment(dto: CreateAppointmentDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/appointments`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_appointment',
      serviceName: 'justcall-api-service',
      logContext: { companyId, customerEmail: requestBody.customer_email },
      spanAttributes: {
        'justcall.operation': 'create_appointment',
        'justcall.company_id': companyId,
        'justcall.customer_email': requestBody.customer_email,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  getAvailableSlots(dto: GetAvailableSlotsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/appointments/available-slots`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_available_slots',
      serviceName: 'justcall-api-service',
      logContext: { companyId, date: dto.date },
      spanAttributes: {
        'justcall.operation': 'get_available_slots',
        'justcall.company_id': companyId,
        'justcall.date': dto.date,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
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

    const url = `${this.baseUrl}/v2.1/users`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_users',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_users',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getUser(dto: GetUserDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/users/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_user',
      serviceName: 'justcall-api-service',
      logContext: { companyId, userId: id },
      spanAttributes: {
        'justcall.operation': 'get_user',
        'justcall.company_id': companyId,
        'justcall.user_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  createUser(dto: CreateUserDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/users`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_user',
      serviceName: 'justcall-api-service',
      logContext: { companyId, email: requestBody.email },
      spanAttributes: {
        'justcall.operation': 'create_user',
        'justcall.company_id': companyId,
        'justcall.user_email': requestBody.email,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  updateUser(dto: UpdateUserDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/users/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_user',
      serviceName: 'justcall-api-service',
      logContext: { companyId, userId: id },
      spanAttributes: {
        'justcall.operation': 'update_user',
        'justcall.company_id': companyId,
        'justcall.user_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
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

    const url = `${this.baseUrl}/v2.1/contacts`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_contacts',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_contacts',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getContact(dto: GetContactDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/contacts/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_contact',
      serviceName: 'justcall-api-service',
      logContext: { companyId, contactId: id },
      spanAttributes: {
        'justcall.operation': 'get_contact',
        'justcall.company_id': companyId,
        'justcall.contact_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  // createContact(dto: CreateContactDto): Promise<any> {
  //   const { companyId, authToken, ...dtoFields } = dto;

  //   // Apply parameter transformation using the transform service
  //   const requestBody = this.parameterTransformService.transformParameters('createContact', dtoFields);

  //   const url = `${this.baseUrl}/v2.1/contacts`;
  //   const headers = this.getAuthHeaders(authToken);

  //   const context = {
  //     operationName: 'create_contact',
  //     serviceName: 'justcall-api-service',
  //     logContext: { companyId, originalPhone: dto.phone },
  //     spanAttributes: {
  //       'justcall.operation': 'create_contact',
  //       'justcall.company_id': companyId,
  //       'justcall.contact_phone': dto.phone,
  //     }
  //   };

  //   return this.executeApiCall(url, context, {
  //     headers,
  //     method: 'POST',
  //     data: requestBody
  //   });
  // }

  updateContact(dto: UpdateContactDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/contacts/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_contact',
      serviceName: 'justcall-api-service',
      logContext: { companyId, contactId: id },
      spanAttributes: {
        'justcall.operation': 'update_contact',
        'justcall.company_id': companyId,
        'justcall.contact_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
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

    const url = `${this.baseUrl}/v2.1/texts`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_sms',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_sms',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
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
    const url = `${this.baseUrl}/v2.1/texts/new`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'send_sms',
      serviceName: 'justcall-api-service',
      logContext: { companyId, contact_number: requestBody.to },
      spanAttributes: {
        'justcall.operation': 'send_sms',
        'justcall.company_id': companyId,
        'justcall.contact_number': requestBody.to,
        'justcall.justcall_number': requestBody.from,
      },
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: transformedRequestBody,
    });
  }

  getSms(dto: GetSmsDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/texts/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_sms',
      serviceName: 'justcall-api-service',
      logContext: { companyId, smsId: id },
      spanAttributes: {
        'justcall.operation': 'get_sms',
        'justcall.company_id': companyId,
        'justcall.sms_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
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

    const url = `${this.baseUrl}/v2.1/numbers`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_numbers',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_numbers',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getNumber(dto: GetNumberDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/numbers/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_number',
      serviceName: 'justcall-api-service',
      logContext: { companyId, numberId: id },
      spanAttributes: {
        'justcall.operation': 'get_number',
        'justcall.company_id': companyId,
        'justcall.number_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  updateNumber(dto: UpdateNumberDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/numbers/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_number',
      serviceName: 'justcall-api-service',
      logContext: { companyId, numberId: id },
      spanAttributes: {
        'justcall.operation': 'update_number',
        'justcall.company_id': companyId,
        'justcall.number_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // Teams Endpoints
  listTeams(dto: ListTeamsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/user_groups`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_teams',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_teams',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getTeam(dto: GetTeamDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/user_groups/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_team',
      serviceName: 'justcall-api-service',
      logContext: { companyId, teamId: id },
      spanAttributes: {
        'justcall.operation': 'get_team',
        'justcall.company_id': companyId,
        'justcall.team_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  createTeam(dto: CreateTeamDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/user_groups`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_team',
      serviceName: 'justcall-api-service',
      logContext: { companyId, teamName: requestBody.name },
      spanAttributes: {
        'justcall.operation': 'create_team',
        'justcall.company_id': companyId,
        'justcall.team_name': requestBody.name,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  // Call Recordings Endpoints
  listRecordings(dto: ListRecordingsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/call-recordings`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_recordings',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_recordings',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getRecording(dto: GetRecordingDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/call-recordings/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_recording',
      serviceName: 'justcall-api-service',
      logContext: { companyId, recordingId: id },
      spanAttributes: {
        'justcall.operation': 'get_recording',
        'justcall.company_id': companyId,
        'justcall.recording_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  // Analytics Endpoints
  getAnalytics(dto: GetAnalyticsDto): Promise<any> {
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

    const url = `${this.baseUrl}/v2.1/calls/analytics/account`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_analytics',
      serviceName: 'justcall-api-service',
      logContext: { companyId, fromDate: dto.from_date, toDate: dto.to_date },
      spanAttributes: {
        'justcall.operation': 'get_analytics',
        'justcall.company_id': companyId,
        'justcall.from_date': dto.from_date,
        'justcall.to_date': dto.to_date,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  // Sales Dialer Endpoints
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

    const url = `${this.baseUrl}/v2.1/sales_dialer/analytics`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_sales_dialer_analytics',
      serviceName: 'justcall-api-service',
      logContext: { companyId, fromDate: dto.from_date, toDate: dto.to_date },
      spanAttributes: {
        'justcall.operation': 'get_sales_dialer_analytics',
        'justcall.company_id': companyId,
        'justcall.from_date': dto.from_date,
        'justcall.to_date': dto.to_date,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  listCampaigns(dto: ListCampaignsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/sales_dialer/campaigns`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_campaigns',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_campaigns',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getCampaign(dto: GetCampaignDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/sales_dialer/campaigns/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_campaign',
      serviceName: 'justcall-api-service',
      logContext: { companyId, campaignId: id },
      spanAttributes: {
        'justcall.operation': 'get_campaign',
        'justcall.company_id': companyId,
        'justcall.campaign_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  createCampaign(dto: CreateCampaignDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/sales_dialer/campaigns`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_campaign',
      serviceName: 'justcall-api-service',
      logContext: { companyId, campaignName: requestBody.name },
      spanAttributes: {
        'justcall.operation': 'create_campaign',
        'justcall.company_id': companyId,
        'justcall.campaign_name': requestBody.name,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  // Webhook Endpoints
  listWebhooks(dto: ListWebhooksDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/webhooks`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_webhooks',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_webhooks',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getWebhook(dto: GetWebhookDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/webhooks/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_webhook',
      serviceName: 'justcall-api-service',
      logContext: { companyId, webhookId: id },
      spanAttributes: {
        'justcall.operation': 'get_webhook',
        'justcall.company_id': companyId,
        'justcall.webhook_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  createWebhook(dto: CreateWebhookDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/webhooks`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_webhook',
      serviceName: 'justcall-api-service',
      logContext: { companyId, webhookUrl: requestBody.url },
      spanAttributes: {
        'justcall.operation': 'create_webhook',
        'justcall.company_id': companyId,
        'justcall.webhook_url': requestBody.url,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  updateWebhook(dto: UpdateWebhookDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/webhooks/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_webhook',
      serviceName: 'justcall-api-service',
      logContext: { companyId, webhookId: id },
      spanAttributes: {
        'justcall.operation': 'update_webhook',
        'justcall.company_id': companyId,
        'justcall.webhook_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // Voicemail Endpoints
  listVoicemails(dto: ListVoicemailsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/voicemails`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_voicemails',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_voicemails',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getVoicemail(dto: GetVoicemailDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/voicemails/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_voicemail',
      serviceName: 'justcall-api-service',
      logContext: { companyId, voicemailId: id },
      spanAttributes: {
        'justcall.operation': 'get_voicemail',
        'justcall.company_id': companyId,
        'justcall.voicemail_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  updateVoicemail(dto: UpdateVoicemailDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/voicemails/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_voicemail',
      serviceName: 'justcall-api-service',
      logContext: { companyId, voicemailId: id },
      spanAttributes: {
        'justcall.operation': 'update_voicemail',
        'justcall.company_id': companyId,
        'justcall.voicemail_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // IVR Endpoints
  listIvr(dto: ListIvrDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/ivr`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_ivr',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_ivr',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getIvr(dto: GetIvrDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/ivr/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_ivr',
      serviceName: 'justcall-api-service',
      logContext: { companyId, ivrId: id },
      spanAttributes: {
        'justcall.operation': 'get_ivr',
        'justcall.company_id': companyId,
        'justcall.ivr_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  // Conference Endpoints
  listConferences(dto: ListConferencesDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/conferences`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_conferences',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_conferences',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getConference(dto: GetConferenceDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/conferences/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_conference',
      serviceName: 'justcall-api-service',
      logContext: { companyId, conferenceId: id },
      spanAttributes: {
        'justcall.operation': 'get_conference',
        'justcall.company_id': companyId,
        'justcall.conference_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  createConference(dto: CreateConferenceDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/conferences`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_conference',
      serviceName: 'justcall-api-service',
      logContext: { companyId, conferenceName: requestBody.name },
      spanAttributes: {
        'justcall.operation': 'create_conference',
        'justcall.company_id': companyId,
        'justcall.conference_name': requestBody.name,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  // Call Queue Endpoints
  listCallQueues(dto: ListCallQueuesDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/call_queues`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_call_queues',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_call_queues',
        'justcall.company_id': companyId,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getCallQueue(dto: GetCallQueueDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/call_queues/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_call_queue',
      serviceName: 'justcall-api-service',
      logContext: { companyId, queueId: id },
      spanAttributes: {
        'justcall.operation': 'get_call_queue',
        'justcall.company_id': companyId,
        'justcall.queue_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }

  getCallQueueStats(dto: GetCallQueueStatsDto): Promise<any> {
    const { companyId, authToken, queue_id, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/call_queues/${queue_id}/stats`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_call_queue_stats',
      serviceName: 'justcall-api-service',
      logContext: { companyId, queueId: queue_id },
      spanAttributes: {
        'justcall.operation': 'get_call_queue_stats',
        'justcall.company_id': companyId,
        'justcall.queue_id': queue_id,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  // User Groups Endpoints
  listUserGroups(dto: ListUserGroupsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/user_groups`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_user_groups',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_user_groups',
        'justcall.company_id': companyId,
        'justcall.params_count': Object.keys(params).length,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  getUserGroup(dto: GetUserGroupDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/user_groups/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_user_group',
      serviceName: 'justcall-api-service',
      logContext: { companyId, userGroupId: id },
      spanAttributes: {
        'justcall.operation': 'get_user_group',
        'justcall.company_id': companyId,
        'justcall.user_group_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }



  // Additional Appointment Endpoints

  getAppointment(dto: GetAppointmentDto): Promise<any> {
    const { companyId, authToken, id } = dto;

    const url = `${this.baseUrl}/v2.1/appointments/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_appointment',
      serviceName: 'justcall-api-service',
      logContext: { companyId, appointmentId: id },
      spanAttributes: {
        'justcall.operation': 'get_appointment',
        'justcall.company_id': companyId,
        'justcall.appointment_id': id,
      }
    };

    return this.executeApiCall(url, context, { headers });
  }


  // SMS Tags Endpoints
  listSmsTags(dto: ListSmsTagsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/texts/tags`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_sms_tags',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_sms_tags',
        'justcall.company_id': companyId,
        'justcall.params_count': Object.keys(params).length,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  createSmsTag(dto: CreateSmsTagDto): Promise<any> {
    const { companyId, authToken, color, ...requestBody } = dto;

    // Transform color to color_code for the API
    const apiRequestBody = {
      ...requestBody,
      color_code: color
    };

    const url = `${this.baseUrl}/v2.1/texts/tags`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_sms_tag',
      serviceName: 'justcall-api-service',
      logContext: { companyId, tagName: requestBody.name },
      spanAttributes: {
        'justcall.operation': 'create_sms_tag',
        'justcall.company_id': companyId,
        'justcall.tag_name': requestBody.name,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: apiRequestBody
    });
  }

  // deleteSmsTag method removed per user request

  // Additional Team Endpoints
  updateTeam(dto: UpdateTeamDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/teams/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_team',
      serviceName: 'justcall-api-service',
      logContext: { companyId, teamId: id },
      spanAttributes: {
        'justcall.operation': 'update_team',
        'justcall.company_id': companyId,
        'justcall.team_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // deleteTeam method removed per user request

  // deleteContact method removed per user request

  // Additional Webhook Endpoints
  // deleteWebhook method removed per user request

  // Additional Number Endpoints
  createNumber(dto: CreateNumberDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/numbers`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_number',
      serviceName: 'justcall-api-service',
      logContext: { companyId, number: requestBody.number },
      spanAttributes: {
        'justcall.operation': 'create_number',
        'justcall.company_id': companyId,
        'justcall.number': requestBody.number,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  // deleteNumber method removed per user request

  // Additional Campaign Endpoints
  updateCampaign(dto: UpdateCampaignDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/campaigns/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_campaign',
      serviceName: 'justcall-api-service',
      logContext: { companyId, campaignId: id },
      spanAttributes: {
        'justcall.operation': 'update_campaign',
        'justcall.company_id': companyId,
        'justcall.campaign_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // deleteCampaign method removed per user request

  // Additional Conference Endpoints
  updateConference(dto: UpdateConferenceDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/conferences/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_conference',
      serviceName: 'justcall-api-service',
      logContext: { companyId, conferenceId: id },
      spanAttributes: {
        'justcall.operation': 'update_conference',
        'justcall.company_id': companyId,
        'justcall.conference_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // deleteConference method removed per user request

  // deleteRecording method removed per user request

  // Call Tags Endpoints
  listCallTags(dto: ListCallTagsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/calls/tags`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_call_tags',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_call_tags',
        'justcall.company_id': companyId,
        'justcall.params_count': Object.keys(params).length,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  createCallTag(dto: CreateCallTagDto): Promise<any> {
    const { companyId, authToken, name, color, ...requestBody } = dto;

    const apiRequestBody = {
      name: name,
      color_code: color,
      ...requestBody
    };

    const url = `${this.baseUrl}/v2.1/calls/tags`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_call_tag',
      serviceName: 'justcall-api-service',
      logContext: { companyId, tagName: name },
      spanAttributes: {
        'justcall.operation': 'create_call_tag',
        'justcall.company_id': companyId,
        'justcall.tag_name': name,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: apiRequestBody
    });
  }

  // Number Analytics Endpoints
  getNumberAnalytics(dto: GetNumberAnalyticsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/calls/analytics/number`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_number_analytics',
      serviceName: 'justcall-api-service',
      logContext: { companyId, from_date: dto.from_date, to_date: dto.to_date, justcall_number: dto.justcall_number },
      spanAttributes: {
        'justcall.operation': 'get_number_analytics',
        'justcall.company_id': companyId,
        'justcall.from_date': dto.from_date,
        'justcall.to_date': dto.to_date,
        'justcall.justcall_number': dto.justcall_number
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      params
    });
  }

  // Additional Appointment Endpoints
  listAppointments(dto: ListAppointmentsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/appointments`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'list_appointments',
      serviceName: 'justcall-api-service',
      logContext: { companyId, paramsCount: Object.keys(params).length },
      spanAttributes: {
        'justcall.operation': 'list_appointments',
        'justcall.company_id': companyId,
        'justcall.params_count': Object.keys(params).length,
      }
    };

    return this.executeApiCall(url, context, { params, headers });
  }

  updateAppointment(dto: UpdateAppointmentDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/appointments/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_appointment',
      serviceName: 'justcall-api-service',
      logContext: { companyId, appointmentId: id },
      spanAttributes: {
        'justcall.operation': 'update_appointment',
        'justcall.company_id': companyId,
        'justcall.appointment_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // Additional User Group Endpoints
  createUserGroup(dto: CreateUserGroupDto): Promise<any> {
    const { companyId, authToken, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/user_groups`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'create_user_group',
      serviceName: 'justcall-api-service',
      logContext: { companyId, groupName: dto.name },
      spanAttributes: {
        'justcall.operation': 'create_user_group',
        'justcall.company_id': companyId,
        'justcall.group_name': dto.name,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'POST',
      data: requestBody
    });
  }

  updateUserGroup(dto: UpdateUserGroupDto): Promise<any> {
    const { companyId, authToken, id, ...requestBody } = dto;

    const url = `${this.baseUrl}/v2.1/user_groups/${id}`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'update_user_group',
      serviceName: 'justcall-api-service',
      logContext: { companyId, groupId: id },
      spanAttributes: {
        'justcall.operation': 'update_user_group',
        'justcall.company_id': companyId,
        'justcall.group_id': id,
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      method: 'PUT',
      data: requestBody
    });
  }

  // Agent Analytics Endpoints
  getAgentAnalytics(dto: GetAgentAnalyticsDto): Promise<any> {
    const { companyId, authToken, ...queryParams } = dto;

    const params = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    const url = `${this.baseUrl}/v2.1/calls/analytics/agent`;
    const headers = this.getAuthHeaders(authToken);

    const context = {
      operationName: 'get_agent_analytics',
      serviceName: 'justcall-api-service',
      logContext: { companyId, from_date: dto.from_date, to_date: dto.to_date, agent_id: dto.agent_id },
      spanAttributes: {
        'justcall.operation': 'get_agent_analytics',
        'justcall.company_id': companyId,
        'justcall.from_date': dto.from_date,
        'justcall.to_date': dto.to_date,
        'justcall.agent_id': dto.agent_id
      }
    };

    return this.executeApiCall(url, context, {
      headers,
      params
    });
  }

}

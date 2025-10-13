import { BaseJustCallDto } from "./base.js";

// Appointments DTOs
export interface ListAppointmentSlotsDto extends BaseJustCallDto {
  calendar_link: string;
  date: string;
  timezone: string;
}

export interface CreateAppointmentDto extends BaseJustCallDto {
  calendar_link: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_number: string;
  customer_timezone: string;
  appointment_customer_date: string;
  appointment_customer_time: string;
  notes?: string;
}

export interface GetAppointmentDto extends BaseJustCallDto {
  id: number;
}

import z from "zod";

// Appointments Schemas
export const ListAppointmentSlotsSchema = {
  calendar_link: z
    .string()
    .describe("The unique link of the calendar to fetch availability from"),
  date: z
    .string()
    .describe("Date for which the available slots are to be fetched (YYYY-MM-DD)"),
  timezone: z
    .string()
    .describe("Timezone in which the slots should be returned"),
};

export const CreateAppointmentSchema = {
  calendar_link: z.string().describe("Link of the associated calendar"),
  customer_first_name: z
    .string()
    .describe("First name of the customer booking the appointment"),
  customer_last_name: z
    .string()
    .describe("Last name of the customer booking the appointment"),
  customer_email: z
    .string()
    .describe("Email Id of the customer booking the appointment"),
  customer_number: z
    .string()
    .describe("Phone number of the customer booking the appointment"),
  customer_timezone: z
    .string()
    .describe("Timezone of the customer booking the appointment"),
  appointment_customer_date: z
    .string()
    .describe(
      "Date on which the appointment is scheduled in customer's timezone (YYYY-MM-DD)"
    ),
  appointment_customer_time: z
    .string()
    .describe(
      "Time on which the appointment is scheduled in customer's timezone (hh:mm:ss)"
    ),
  notes: z.string().optional().describe("Reference notes added by the contact"),
};

export const GetAppointmentSchema = {
  id: z.number().describe("Unique identifier of the appointment"),
};

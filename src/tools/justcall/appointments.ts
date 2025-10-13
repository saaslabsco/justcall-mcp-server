import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createToolHandler, getAuthToken } from "../utils.js";
import { JustCallApiService } from "../../sdk/justcall.js";
import {
  ListAppointmentSlotsSchema,
  CreateAppointmentSchema,
  GetAppointmentSchema,
} from "../../schema/index.js";

export const registerAppointmentTools = (server: McpServer) => {
  const justcallAPIservice = new JustCallApiService();

  // List Appointment Slots Tool
  server.tool(
    "list_appointment_slots",
    "Retrieve all available time slots for appointments on a specific JustCall calendar",
    ListAppointmentSlotsSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.listAppointmentSlots({
        authToken,
        ...params,
      });
    })
  );

  // Create Appointment Tool
  server.tool(
    "create_appointment",
    "Schedule a new appointment on a specific JustCall calendar",
    CreateAppointmentSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.createAppointment({
        authToken,
        ...params,
      });
    })
  );

  // Get Appointment Tool
  server.tool(
    "get_appointment",
    "Retrieve details of a specific appointment by its ID",
    GetAppointmentSchema,
    createToolHandler(async (params, context) => {
      const authToken = getAuthToken(context);
      return justcallAPIservice.getAppointment({
        authToken,
        ...params,
      });
    })
  );
};

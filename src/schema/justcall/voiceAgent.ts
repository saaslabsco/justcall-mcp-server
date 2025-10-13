import z from "zod";

// Voice Agent Schemas
export const ListVoiceAgentsSchema = {
  per_page: z
    .number()
    .optional()
    .describe(
      "Number of voice agents to be fetched per page. Default value is 50 and maximum value is 100."
    ),
  page: z
    .number()
    .optional()
    .describe(
      "Page number for which voice agents are to be fetched. Page 0 = first page."
    ),
  order: z
    .enum(["asc", "desc"])
    .optional()
    .describe(
      "Order in which the voice agents should appear sorted by the creation time."
    ),
};

const DynamicVariableSchema = z.object({
  name: z
    .string()
    .describe(
      "Unique identifier used to reference this variable within the agent's logic, prompts, or scripts"
    ),
  value: z
    .string()
    .describe(
      "Value of the dynamic variable. Represents the actual data passed at runtime (e.g., caller's name, appointment time, etc)"
    ),
  type: z
    .enum(["string"])
    .optional()
    .describe(
      "Defines the expected data type of the variable (e.g., string, number, boolean, date). Default: String"
    ),
});

export const InitiateVoiceAgentCallSchema = {
  ai_agent_id: z
    .string()
    .describe("Unique identifier of the AI Voice Agent to use for this call"),
  contact_number: z
    .string()
    .describe("Recipient's phone number in E.164 format. Example: 1681381XXXX"),
  has_consent: z
    .boolean()
    .describe(
      "Must be true only if you have obtained prior express written consent from the recipient. This confirms full compliance with all outbound communication regulations."
    ),
  dynamic_variables: z
    .array(DynamicVariableSchema)
    .optional()
    .describe(
      "Array of key-value pairs for conversation personalization. Each object must include a name, value and type, where name matches a configured variable in your agent's Dynamic Variable Manager (DVM)"
    ),
};

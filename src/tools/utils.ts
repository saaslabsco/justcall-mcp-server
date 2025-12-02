export type ToolResponse = {
  content: Array<{ type: "text"; text: string }>;
  structuredContent?: any;
  _meta?: Record<string, any>;
};

export function createSuccessResponse(
  data: any,
  openAiWidget?: boolean,
): ToolResponse {
  const response: ToolResponse = {
    content: [
      {
        type: "text" as const,
        text: typeof data === "string" ? data : JSON.stringify(data),
      },
    ],
  };
  if (openAiWidget) {
    response.structuredContent = data;
    response.content = [
      {
        type: "text" as const,
        text: "Calls List Widget",
      },
    ];
    response._meta = {
      "openai/outputTemplate": "ui://widget/calls-list.html",
      "openai/toolInvocation/invoking": "Fetching calls from JustCall",
      "openai/toolInvocation/invoked": "Calls fetched from JustCall",
      "openai/widgetAccessible": true,
      "openai/resultCanProduceWidget": true,
    };
  }
  return response;
}

export function createErrorResponse(error: any): ToolResponse {
  const errorMessage = error?.message || String(error);
  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${errorMessage}`,
      },
    ],
  };
}

export function createToolHandler<T>(
  handler: (params: T, context?: any) => Promise<any>,
  openAiWidget?: boolean,
): (params: T, context?: any) => Promise<ToolResponse> {
  return async (params: T, context?: any) => {
    try {
      const result = await handler(params, context);
      return createSuccessResponse(result, openAiWidget);
    } catch (error) {
      return createErrorResponse(error);
    }
  };
}

/**
 * Get the auth token from the context
 * @param context - The context of the request
 * @returns The auth token
 */
export function getAuthToken(context?: any): string {
  const authHeader = context?.requestInfo?.headers.authorization;
  const apiKey = authHeader?.replace("Bearer ", "");
  const authToken =
    apiKey ??
    `${process.env.JUSTCALL_API_KEY}:${process.env.JUSTCALL_API_SECRET}`;
  return authToken;
}

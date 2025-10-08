export type ToolResponse = {
  content: Array<{ type: "text"; text: string }>;
};

export function createSuccessResponse(data: any): ToolResponse {
  return {
    content: [
      {
        type: "text" as const,
        text: typeof data === "string" ? data : JSON.stringify(data),
      },
    ],
  };
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
  handler: (params: T, context?: any) => Promise<any>
): (params: T, context?: any) => Promise<ToolResponse> {
  return async (params: T, context?: any) => {
    try {
      const result = await handler(params, context);
      return createSuccessResponse(result);
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
  const [apiKey, apiSecret] =
    authHeader?.replace("Bearer ", "").split(":") || [];
  const authToken =
    apiKey && apiSecret
      ? `${apiKey}:${apiSecret}`
      : `${process.env.JUSTCALL_API_KEY}:${process.env.JUSTCALL_API_SECRET}`;
  return authToken;
}

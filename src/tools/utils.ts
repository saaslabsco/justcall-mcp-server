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
  let errorMessage = error?.message || String(error);

  // Handle Axios errors with more detail
  if (error?.isAxiosError) {
    const status = error.response?.status;
    const statusText = error.response?.statusText;
    const responseData = error.response?.data;

    errorMessage = `HTTP ${status} ${statusText}: ${errorMessage}`;

    // Add response data if available
    if (responseData) {
      const dataStr = typeof responseData === 'string'
        ? responseData
        : JSON.stringify(responseData);
      errorMessage += `\nResponse: ${dataStr}`;
    }

    // Add request details for debugging
    if (error.config?.url) {
      errorMessage += `\nEndpoint: ${error.config.method?.toUpperCase()} ${error.config.url}`;
    }
  }

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
 * @throws Error if no valid authentication credentials are found
 */
export function getAuthToken(context?: any): string {
  const authHeader = context?.requestInfo?.headers.authorization;
  const [apiKey, apiSecret] =
    authHeader?.replace("Bearer ", "").split(":") || [];

  // Try to get auth from request header first
  if (apiKey && apiSecret) {
    return `${apiKey}:${apiSecret}`;
  }

  // Fall back to environment variables
  const envApiKey = process.env.JUSTCALL_API_KEY;
  const envApiSecret = process.env.JUSTCALL_API_SECRET;

  if (!envApiKey || !envApiSecret) {
    throw new Error(
      "Authentication credentials not found. Please provide JUSTCALL_API_KEY and JUSTCALL_API_SECRET " +
      "either via Authorization header (Bearer API_KEY:API_SECRET) or environment variables."
    );
  }

  return `${envApiKey}:${envApiSecret}`;
}

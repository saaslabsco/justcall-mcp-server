export function parseToolResponse(response: any): any {
  // If no response or it's a primitive, return as is
  if (!response || typeof response !== 'object') return response;

  // Check for content array with text items
  if (response.content && Array.isArray(response.content)) {
    const textContent = response.content.find(
      (item: { type: string; text?: string }) => item.type === 'text'
    )?.text;

    if (textContent) {
      // Check if it's an error message first - only if it starts with 'Error:'
      if (textContent.startsWith('Error:')) {
        return { error: textContent };
      }

      try {
        return JSON.parse(textContent);
      } catch (e) {
        // Don't warn on expected error messages
        if (!textContent.startsWith('Error:')) {
          console.warn('Failed to parse text content as JSON:', e);
        }
        return textContent;
      }
    }
  }

  return response;
}

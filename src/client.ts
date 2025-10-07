import { VapiClient, Vapi } from '@vapi-ai/server-sdk';

export const createVapiClient = (token: string): VapiClient => {
  if (!token) {
    throw new Error('No Vapi token available');
  }
  return new VapiClient({ token });
};

export class MockVapiClient {
  assistants = {
    list: jest.fn().mockResolvedValue([
      {
        id: 'mock-assistant-id-1',
        name: 'Mock Assistant 1',
        model: 'gpt-4',
        instructions: 'Example instructions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'mock-assistant-id-2',
        name: 'Mock Assistant 2',
        model: 'claude-3-opus',
        instructions: 'Another example',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]),

    get: jest.fn().mockImplementation((id) => {
      return Promise.resolve({
        id,
        name: `Mock Assistant ${id}`,
        model: 'gpt-4',
        instructions: 'Example instructions',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }),

    create: jest.fn().mockImplementation((data) => {
      return Promise.resolve({
        id: 'new-mock-assistant-id',
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }),
  };
}

export const createMockVapiClient = () => {
  return new MockVapiClient();
};

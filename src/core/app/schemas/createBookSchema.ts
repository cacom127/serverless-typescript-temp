export default {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: 100,
      },
    },
    required: ['name'],
  } as const
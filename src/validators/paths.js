const { validateBody } = require('./base');

const validateUpdatePathName = validateBody({
  type: 'object',
  properties: {
    name: { type: 'string' }
  },
  required: ['name'],
  additionalProperties: false
});

const validateCalculatePathsForBlueprint = validateBody({
  type: 'object',
  required: [ 'blueprint_spec'],
  properties: {
    workflow_id: { type: 'string', format: 'uuid' },
    created_at: { type: 'string', format: 'date-time' },
    name: { type: 'string' },
    description: { type: 'string' },
    version: { type: 'integer' },
    hash: { type: ['string', 'null'] },
    isLatest: { type: 'boolean' },
    blueprint_spec: { 
      type: 'object',
      required: [ 'nodes' ],
      properties: {
        lanes: { type: 'array' },
        nodes: { 
          type: 'array',
          items: { type: 'object' }
        },
        prepare: { type: 'array' },
        requirements: { type: 'array' },
        environment: { type: 'object' },
      },
      additionalProperties: false
    },
  },
  additionalProperties: false
})

module.exports = {
  validateCalculatePathsForBlueprint,
  validateUpdatePathName
}
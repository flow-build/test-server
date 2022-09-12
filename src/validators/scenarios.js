const { validateBody } = require('./base');

const validateUpdateScenarioName = validateBody({
  type: 'object',
  properties: {
    name: { type: 'string' }
  },
  required: ['name'],
  additionalProperties: false
});

module.exports = {
  validateUpdateScenarioName
}
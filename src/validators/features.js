const { validateBody } = require('./base');

const validateSaveFeature = validateBody({
  type: 'object',
  required: ['workflow_name', 'feature'],
  properties: {
    workflow_name: { type: 'string' },
    feature: { 
      type: 'string',
      allOf: [
        {
          'transform': [
            'trim'
          ]
        },
        {
          'minLength': 21
        }
      ]
    }
  },
  additionalProperties: false
});

module.exports = {
  validateSaveFeature
}
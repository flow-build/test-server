const { logger } = require('../utils/logger');
const featuresServices = require('../services/features');
const gherkin = require('gherkin');
const parser = new gherkin.Parser();

const saveFeature = async (ctx, next) => {
  logger.debug('saveFeature controller called');

  try {
    const { workflow_name, feature } = ctx.request.body;
    const featureParsed = parser.parse(feature).feature;

    const featureSaved = await featuresServices.saveFeature(workflow_name, featureParsed);

    ctx.status = 201;
    ctx.body = {
      id: featureSaved.id,
      name: featureSaved.name,
      workflow_name: featureSaved.workflow_name,
      created_at: featureSaved.created_at
    }
  } catch(err) {
    throw new Error(err);
  }

  return next();
}

module.exports = {
  saveFeature
}
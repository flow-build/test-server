const { logger } = require('../utils/logger');
const featuresServices = require('../services/features');
const gherkin = require('gherkin');
const parser = new gherkin.Parser();
const gherkinParse = require('gherkin-parse');

const serializeFeatureFile = ({feature}) => {
  const gherkinDocument = {
    type: 'GherkinDocument',
    feature: {
      ...feature
    }
  }
  return gherkinParse.convertJSONToFeatureFile(gherkinDocument);
}

const serializeNoFeatureFile = (feature) => {
  return {
    id: feature.id,
    name: feature.name,
    workflow_name: feature.workflow_name,
    created_at: feature.created_at,
    updated_at: feature.updated_at
  }
}

const saveFeature = async (ctx, next) => {
  logger.debug('saveFeature controller called');

  try {
    const { workflow_name, feature } = ctx.request.body;
    const featureParsed = parser.parse(feature).feature;

    const featureSaved = await featuresServices.saveFeature(workflow_name, featureParsed);

    ctx.status = 201;
    ctx.body = {
      ...serializeNoFeatureFile({ ...featureSaved })
    }
  } catch(err) {
    throw new Error(err);
  }

  return next();
}

const getAllFeatures = async (ctx, next) => {
  logger.debug('getAllFeatures controller called');

  try {
    const features = await featuresServices.getAllFeatures();

    ctx.status = 200;
    ctx.body = features.map((feature) => serializeNoFeatureFile(feature));
  } catch(err) {
    throw new Error(err);
  }

  return next();
}

const getFeatureById = async (ctx, next) => {
  logger.debug('getFeatureById controller called');

  const { id } = ctx.params;

  try {
    const feature = await featuresServices.getFeatureById(id);

    if (feature) {
      ctx.status = 200;
      ctx.body = serializeFeatureFile(feature);
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'Feature not found'
      }
    }
  } catch(err) {
    throw new Error(err);
  }

  return next();
}

const getFeatureByWorkflowName = async (ctx, next) => {
  logger.debug('getFeatureByWorkflowName controller called');

  const { workflow_name } = ctx.params;

  try {
    const feature = await featuresServices.getFeatureByWorkflowName(workflow_name);

    if (feature) {
      ctx.status = 200;
      ctx.body = serializeFeatureFile(feature);
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'Feature not found'
      }
    }
  } catch(err) {
    throw new Error(err);
  }

  return next();
}

const deleteFeature = async (ctx, next) => {
  logger.debug('deleteFeature controller called');

  const { id } = ctx.params;

  try {
    const featureDeleted = await featuresServices.deleteFeature(id);

    if (featureDeleted) {
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'Feature not found'
      }
    }
  } catch(err) {
    throw new Error(err);
  }

  return next();
}

module.exports = {
  saveFeature,
  deleteFeature,
  getAllFeatures,
  getFeatureById,
  getFeatureByWorkflowName
}
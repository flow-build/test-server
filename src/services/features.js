const { db } = require('../utils/db');
const { logger } = require('../utils/logger');
const { v4: uuid } = require('uuid');

const saveFeature = async (workflow_name, feature) => {
  logger.debug('saveFeature service called');

  const [ featureSaved ] = await db('features').insert(
    {
      id: uuid(),
      workflow_name: workflow_name,
      name: feature.name,
      feature: feature
    }
  ).returning('*');

  return featureSaved;
}

const getFeatureByName = async (workflow_name) => {
  logger.debug('getFeatureByName service called');

  const feature = await db('features').where('workflow_name', workflow_name).first();

  return feature;
}

module.exports = {
  saveFeature,
  getFeatureByName
}
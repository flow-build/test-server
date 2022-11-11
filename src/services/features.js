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

const getFeatureByWorkflowName = async (workflow_name) => {
  logger.debug('getFeatureByName service called');

  const feature = await db('features').where('workflow_name', workflow_name).first();

  return feature;
}

const getAllFeatures = async () => {
  logger.debug('getAllFeatures service called');

  const features = await db('features');

  return features;
}

const getFeatureById = async (id) => {
  logger.debug('getFeatureById service called');

  const feature = await db('features').where('id', id).first();

  return feature;
}

const deleteFeature = async (id) => {
  logger.debug('deleteFeature service called');

  const featureDeleted = await db('features').where('id', id).del();

  return featureDeleted;
}

module.exports = {
  saveFeature,
  getFeatureByWorkflowName,
  deleteFeature,
  getAllFeatures,
  getFeatureById
}
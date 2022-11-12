const { db } = require('../utils/db');
const { logger } = require('../utils/logger');
const { v4: uuid } = require('uuid');
const { getAllPaths } = require('@flowbuild/test-core');
const { flowbuildApi, getToken } = require('../utils/api');

const getPathsByWorkflowId = async (workflow_id) => {
  logger.debug('getPathsByWorkflowId service called');

  const data = await db('paths').where('workflow_id', workflow_id);

  return data;
}

const getPathsByWorkflowName = async (workflow_name) => {
  logger.debug('getPathsByWorkflowName service called');

  const data = await db('paths').where('workflow_name', workflow_name);

  return data;
}

const getPathById = async (path_id) => {
  logger.debug('getPathById service called');

  const data = await db('paths').where('id', path_id).first();

  return data;
}

const savePaths = async (workflow_id, paths, workflow_name) => {
  logger.debug('savePathsForBlueprint service called');
  let data = [];

  for (const path of paths) {
    path.name = workflow_name ? `${workflow_name}_${path.id}` : path.name.replace('>', '');
    const [pathSaved] = await db('paths').insert(
      {
        id: uuid(),
        workflow_id: workflow_id,
        workflow_name: workflow_name,
        name: path.name,
        nodes: path.nodes,
        steps: path.steps
      }
    ).returning('*');
    data.push(pathSaved);
  }

  return data;
}

const calculatePathsForBlueprint = async (blueprint) => {
  logger.debug('calculatePathsForBlueprint service called');

  const data = getAllPaths(blueprint);

  return data;
}

const getWorkflowFromFlowbuild = async (workflow_id) => {
  logger.debug('getWorkflowFromFlowbuild service called');
  const token = await getToken();
  let error = null;

  const blueprint = await flowbuildApi.get(`/workflows/${workflow_id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then((response) => response.data)
    .catch((err) => {
      logger.error(err.message);
      error = err.message;
      return;
    });
  
  return {
    blueprint,
    error
  }
}

const updatePathName = async (path_id, name) => {
  logger.debug('updatePathName service called');

  const [dataUpdated] = await db('paths')
    .where('id', path_id)
    .update({ name: name, updated_at: 'now' })
    .returning('*');

  return dataUpdated;
}

const deletePathsByWorkflowId = async (workflow_id) => {
  logger.debug('deletePathsByWorkflowId service called');

  const dataDeleted = await db('paths').where('workflow_id', workflow_id).del();

  return dataDeleted;
}

module.exports = {
  getPathsByWorkflowId,
  getPathsByWorkflowName,
  getPathById,
  calculatePathsForBlueprint,
  getWorkflowFromFlowbuild,
  savePaths,
  updatePathName,
  deletePathsByWorkflowId
}
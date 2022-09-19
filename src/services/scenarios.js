const { db } = require('../utils/db');
const { logger } = require('../utils/logger');
const { v4: uuid } = require('uuid');
const { getAllPaths } = require('@flowbuild/test-core');
const { flowbuildApi, getToken } = require('../utils/api');
const { buildXmlDiagram } = require('@flowbuild/nodejs-diagram-builder');

const getScenariosByWorkflowId = async (workflow_id) => {
  logger.debug('getScenariosByWorkflowId service called');

  const dataDb = await db('scenarios').where('workflow_id', workflow_id).first();

  return dataDb;
}

const getScenariosByWorkflowIdFb = async (workflow_id, ignoreLoop = false) => {
  logger.debug('getScenariosByWorkflowIdFb service called');

  const token = await getToken();

  const blueprint = await flowbuildApi.get(`/workflows/${workflow_id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data)
    .catch((error) => {
      logger.error(error.message);
      return;
    });

  if (!blueprint) {
    return;
  } else {
    const dataFb = getAllPaths(blueprint, ignoreLoop);
    return dataFb;
  }
}

const saveScenariosForBlueprint = async (blueprint) => {
  logger.debug('saveScenariosForBlueprint service called');

  const data = getAllPaths(blueprint);

  const [dataSaved] = await db('scenarios').insert(
    {
      id: uuid(),
      workflow_id: blueprint.workflow_id,
      total_scenarios: data.totalScenarios,
      scenarios: JSON.stringify(data.scenarios)
    }
  ).returning('*');

  return dataSaved;
}

const saveScenariosForWorkflowId = async (workflow_id) => {
  logger.debug('saveScenariosForWorkflowId service called');

  const token = await getToken();

  const blueprint = await flowbuildApi.get(`/workflows/${workflow_id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data)
    .catch((error) => {
      logger.error(error.message);
      return;
    });

  if (!blueprint) {
    return;
  } else {
    const data = getAllPaths(blueprint);

    const [dataSaved] = await db('scenarios').insert(
      {
        id: uuid(),
        workflow_id: workflow_id,
        total_scenarios: data.totalScenarios,
        scenarios: JSON.stringify(data.scenarios)
      }
    ).returning('*');

    return dataSaved;
  }
}

const updateScenarioName = async (workflow_id, data) => {
  logger.debug('updateScenarioName service called');

  const [dataUpdated] = await db('scenarios')
    .where('workflow_id', workflow_id)
    .update({ ...data, scenarios: JSON.stringify(data.scenarios), updated_at: 'now' })
    .returning('scenarios');

  return dataUpdated;
}

module.exports = {
  getScenariosByWorkflowId,
  getScenariosByWorkflowIdFb,
  saveScenariosForBlueprint,
  saveScenariosForWorkflowId,
  updateScenarioName
}
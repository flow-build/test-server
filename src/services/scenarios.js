const { db } = require('../utils/db');
const { logger } = require('../utils/logger');
const { v4: uuid } = require('uuid');
const { getAllPaths } = require('@flowbuild/test-core');
const { flowbuildApi, getToken } = require('../utils/api');

const getScenariosByWorkflowId = async (workflow_id) => {
  logger.debug('getScenariosByWorkflowId service called');

  const data = await db('scenarios').where('workflow_id', workflow_id);

  return data;
}

const getScenarioById = async (scenario_id) => {
  logger.debug('getScenarioById service called');

  const data = await db('scenarios').where('id', scenario_id).first();

  return data;
}

const saveScenarios = async (workflow_id, scenarios, workflow_name) => {
  logger.debug('saveScenariosForBlueprint service called');
  let data = [];

  for (const scenario of scenarios) {
    scenario.name = workflow_name ? `${workflow_name}_${scenario.id}` : scenario.name.replace('>', '');
    const [scenarioSaved] = await db('scenarios').insert(
      {
        id: uuid(),
        workflow_id: workflow_id,
        name: scenario.name,
        nodes: scenario.nodes,
        steps: scenario.steps
      }
    ).returning('*');
    data.push(scenarioSaved);
  }

  return data;
}

const calculateScenariosForBlueprint = async (blueprint) => {
  logger.debug('calculateScenariosForBlueprint service called');

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

const updateScenarioName = async (scenario_id, name) => {
  logger.debug('updateScenarioName service called');

  const [dataUpdated] = await db('scenarios')
    .where('id', scenario_id)
    .update({ name: name, updated_at: 'now' })
    .returning('*');

  return dataUpdated;
}

const deleteScenariosByWorkflowId = async (workflow_id) => {
  logger.debug('deleteScenariosByWorkflowId service called');

  const dataDeleted = await db('scenarios').where('workflow_id', workflow_id).del();

  return dataDeleted;
}

module.exports = {
  getScenariosByWorkflowId,
  getScenarioById,
  calculateScenariosForBlueprint,
  getWorkflowFromFlowbuild,
  saveScenarios,
  updateScenarioName,
  deleteScenariosByWorkflowId
}
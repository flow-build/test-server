const { db } = require('../utils/db');
const { logger } = require('../utils/logger');
const { v4: uuid } = require('uuid');
const { getAllPaths } = require('@flowbuild/test-core');
const { flowbuildApi, getToken } = require('../utils/api');
const { buildXmlDiagram } = require('@flowbuild/nodejs-diagram-builder');

const getScenariosByWorkflowIdDb = async (workflow_id) => {
  logger.debug('getScenariosByWorkflowIdDb service called');

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

const getDiagramForScenario = async (workflow_id, scenario) => {
  const token = await getToken();

  const blueprint = await flowbuildApi.get(`/workflows/${workflow_id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data)
    .catch((error) => {
      logger.error(error.message);
      return;
    });
    
  let repeatedNodes = [];
  blueprint.blueprint_spec.nodes = blueprint.blueprint_spec.nodes
    .filter((node) => scenario.nodes.includes(node.id))
    .map((node) => {
      if (node.type.toLowerCase() === 'flow') {
        const nextNodes = Object.values(node.next);
        nextNodes.forEach((next) => {
          if (scenario.nodes.includes(next) && !repeatedNodes.includes(next)) {
            node.next = {
              next: next
            };
          }
        })
      }
      repeatedNodes.push(node.id);
      return node;
    })
  const diagram = await buildXmlDiagram(blueprint);
  return diagram;
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
  getScenariosByWorkflowIdDb,
  getScenariosByWorkflowIdFb,
  saveScenariosForBlueprint,
  saveScenariosForWorkflowId,
  getDiagramForScenario,
  updateScenarioName
}
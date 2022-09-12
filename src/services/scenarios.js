const { db } = require('../utils/db');
const { logger } = require('../utils/logger');

const getScenariosByWorkflowId = async (workflow_id) => {
  logger.debug('getScenariosByWorkflowId service called');

  const data = await db('scenarios').where('workflow_id', workflow_id).first();
  
  return data;
}

const updateScenarioName = async (workflow_id, data) => {
  logger.debug('updateScenarioName service called');

  const [ dataUpdated ] = await db('scenarios')
    .where('workflow_id', workflow_id)
    .update({...data, scenarios: JSON.stringify(data.scenarios), updated_at: 'now'})
    .returning('scenarios');
  
    return dataUpdated;
}

module.exports = {
  getScenariosByWorkflowId,
  updateScenarioName
}
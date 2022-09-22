const { logger } = require('../utils/logger');
const scenariosServices = require('../services/scenarios');

const getScenariosByWorkflowId = async (ctx, next) => {
  logger.debug('getScenariosByWorkflowId controller called');

  const workflow_id = ctx.params.id;

  try {
    const data = await scenariosServices.getScenariosByWorkflowId(workflow_id);

    if (data.length === 0) {
      ctx.status = 404
      ctx.body = {
        message: 'Workflow not found'
      }
    } else {
      ctx.status = 200;
      ctx.body = data;
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const calculateScenariosForBlueprint = async (ctx, next) => {
  logger.debug('calculateScenariosForBlueprint controller called');

  const blueprint = ctx.request.body;
  const { strategy } = ctx.query;

  try {
    const paths = await scenariosServices.calculateScenariosForBlueprint(blueprint);

    if (strategy === 'persist') {
      if (!blueprint.workflow_id) {
        ctx.status = 400;
        ctx.body = {
          message: "Must provide 'workflow_id' to persist scenarios"
        }
      } else {
        const data = await scenariosServices.getScenariosByWorkflowId(blueprint.workflow_id);
      
        if (data.length === 0) {
          const scenariosSaved = await scenariosServices.saveScenarios(blueprint.workflow_id, paths.scenarios);
    
          ctx.status = 201;
          ctx.body = scenariosSaved;
        } else {
          ctx.status = 400;
          ctx.body = {
            message: `Scenarios already exists for workflow_id: ${blueprint.workflow_id}`
          }
        }
      }
    } else {
      ctx.status = 200;
      ctx.body = paths;
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const saveScenariosForWorkflowId = async (ctx, next) => {
  logger.debug('saveScenariosForWorkflowId controller called');

  const { id } = ctx.params;

  try {
    const data = await scenariosServices.getScenariosByWorkflowId(id);

    if (data.length === 0) {
      const {blueprint, error} = await scenariosServices.getWorkflowFromFlowbuild(id);

      if (error) {
        ctx.status = 502;
        ctx.body = {
          message: 'Flowbuild server unavailable'
        }
      } else if (!blueprint) {
        ctx.status = 404,
        ctx.body = {
          message: 'Workflow not found'
        }
      } else {
        const { scenarios } = await scenariosServices.calculateScenariosForBlueprint(blueprint);
        const scenariosSaved = await scenariosServices.saveScenarios(id, scenarios);

        ctx.status = 201;
        ctx.body = scenariosSaved;
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        message: `Scenarios already exists for workflow_id: ${id}`
      }
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const updateScenarioName = async (ctx, next) => {
  logger.debug('updateScenarioName controller called');

  const { id } = ctx.params;
  const { name } = ctx.request.body;

  try {
    const data = await scenariosServices.getScenarioById(id);

    if (!data) {
      ctx.status = 404;
      ctx.body = {
        message: 'Scenario not found'
      }
    } else {
      const scenarioUpdated = await scenariosServices.updateScenarioName(id, name);
      
      ctx.status = 200;
      ctx.body = scenarioUpdated;
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const deleteScenariosByWorkflowId = async (ctx, next) => {
  logger.debug('deleteScenariosByWorkflowId controller called');

  const workflow_id = ctx.params.id;

  try {
    const scenariosDeleted = await scenariosServices.deleteScenariosByWorkflowId(workflow_id);

    if (scenariosDeleted) {
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = {
        message: 'Workflow not found'
      }
    } 
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

module.exports = {
  getScenariosByWorkflowId,
  calculateScenariosForBlueprint,
  saveScenariosForWorkflowId,
  updateScenarioName,
  deleteScenariosByWorkflowId
}
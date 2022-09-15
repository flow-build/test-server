const { logger } = require('../utils/logger');
const scenariosServices = require('../services/scenarios');

const getScenariosByWorkflowId = async (ctx, next) => {
  logger.debug('getScenariosByWorkflowId controller called');

  const workflow_id = ctx.params.id;

  try {
    const dataDb = await scenariosServices.getScenariosByWorkflowIdDb(workflow_id);

    if (!dataDb) {
      const dataFb = await scenariosServices.getScenariosByWorkflowIdFb(workflow_id);

      if (!dataFb) {
        ctx.status = 404
        ctx.body = {
          message: 'Workflow not found'
        }
      } else {
        ctx.status = 200;
        ctx.body = {
          totalScenarios: dataFb.totalScenarios,
          scenarios: dataFb.scenarios
        }
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        totalScenarios: dataDb.total_scenarios,
        scenarios: dataDb.scenarios
      }
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const saveScenariosForBlueprint = async (ctx, next) => {
  logger.debug('saveScenariosForBlueprint controller called');

  const blueprint = ctx.request.body;

  try {
    const data = await scenariosServices.getScenariosByWorkflowIdDb(blueprint.workflow_id);

    if (!data) {
      const dataSaved = await scenariosServices.saveScenariosForBlueprint(blueprint);

      ctx.status = 201;
      ctx.body = {
        totalScenarios: dataSaved.total_scenarios,
        scenarios: dataSaved.scenarios
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        message: `Scenarios already exists for workflow_id: ${blueprint.workflow_id}`
      }
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const saveScenariosForWorkflowId = async (ctx, next) => {
  logger.debug('saveScenariosForWorkflowId controller called');

  const { workflow_id } = ctx.params;

  try {
    const data = await scenariosServices.getScenariosByWorkflowIdDb(workflow_id);

    if (!data) {
      const dataSaved = await scenariosServices.saveScenariosForWorkflowId(workflow_id);

      if (!dataSaved) {
        ctx.status = 404,
        ctx.body = {
          message: 'Workflow not found'
        }
      } else {
        ctx.status = 201;
        ctx.body = {
          totalScenarios: dataSaved.total_scenarios,
          scenarios: dataSaved.scenarios
        }
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        message: `Scenarios already exists for workflow_id: ${workflow_id}`
      }
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const getDiagramForScenario = async (ctx, next) => {
  logger.debug('getDiagramForScenario controller called');

  const { workflow_id, scenario_id } = ctx.params;

  try {
    let data = await scenariosServices.getScenariosByWorkflowIdFb(workflow_id, true);

    if (!data) {
      ctx.status = 404;
      ctx.body = {
        message: 'Blueprint not found on server'
      }
    } else {
      const scenario = data.scenarios.find((scenario) => scenario.id == scenario_id);

      if (!scenario) {
        ctx.status = 404;
        ctx.body = {
          message: 'Scenario not found'
        }
      } else {
        const diagram = await scenariosServices.getDiagramForScenario(workflow_id, scenario);

        ctx.status = 200;
        ctx.body = diagram;
      }
    }
  } catch (err) {
    throw new Error(err)
  }

  return next();
}

const updateScenarioName = async (ctx, next) => {
  logger.debug('updateScenarioName controller called');

  const { workflow_id, scenario_id } = ctx.params;
  const { name } = ctx.request.body;

  try {
    const data = await scenariosServices.getScenariosByWorkflowIdDb(workflow_id);

    if (!data) {
      ctx.status = 404;
      ctx.body = {
        message: 'Workflow not found'
      }
    } else {
      const scenario = await data.scenarios.find((scenario) => scenario.id == scenario_id);

      if (!scenario) {
        ctx.status = 404;
        ctx.body = {
          message: 'Scenario not found'
        }
      } else {
        data.scenarios = data.scenarios.map((scenario) => {
          if (scenario.id == scenario_id) {
            scenario.name = name;
          }
          return scenario;
        });
        const scenarioUpdated = await scenariosServices.updateScenarioName(workflow_id, data);
        ctx.status = 200;
        ctx.body = scenarioUpdated;
      }
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

module.exports = {
  getScenariosByWorkflowId,
  saveScenariosForBlueprint,
  saveScenariosForWorkflowId,
  getDiagramForScenario,
  updateScenarioName
}
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const baseValidator = require('../validators/base');
const validateScenario = require('../validators/scenarios');
const healthController = require('../controllers/healthCheck');
const scenariosController = require('../controllers/scenarios');

module.exports = (opts = {}) => {
  const router = new Router();

  router.use(bodyParser());
  router.use(cors(opts.corsOptions));
  router.get('/', healthController.healtchCheck);

  const workflows = Router();
  workflows.prefix('/workflows');
  workflows.get('/:id/scenarios',
    baseValidator.validateUUID,
    scenariosController.getScenariosByWorkflowId
  );
  workflows.patch(
    '/:workflow_id/scenarios/:scenario_id',
    baseValidator.validateUUID,
    validateScenario.validateUpdateScenarioName,
    scenariosController.updateScenarioName
  );
  workflows.get(
    '/:workflow_id/scenarios/:scenario_id',
    baseValidator.validateUUID,
    scenariosController.getDiagramForScenario
  );
  
  const scenarios = Router();
  scenarios.prefix('/scenarios');
  scenarios.post('/workflow/:workflow_id/save',
    baseValidator.validateUUID,
    scenariosController.saveScenariosForWorkflowId
  );
  scenarios.post('/blueprint/save',
    validateScenario.validateSaveScenariosForBlueprint,
    scenariosController.saveScenariosForBlueprint
  );
  
  router.use(workflows.routes());
  router.use(scenarios.routes());

  return router; 
}
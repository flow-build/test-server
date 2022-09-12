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

  router.get('/workflow/:id/scenarios', baseValidator.validateUUID, scenariosController.getScenariosByWorkflowId);
  router.get('/', healthController.healtchCheck);
  router.patch(
    '/workflow/:workflow_id/scenarios/:scenario_id',
    baseValidator.validateUUID,
    validateScenario.validateUpdateScenarioName,
    scenariosController.updateScenarioName
  );
  
  return router; 
}
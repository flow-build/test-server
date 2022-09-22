const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const fs = require('fs');
const baseValidator = require('../validators/base');
const validateScenario = require('../validators/scenarios');
const healthController = require('../controllers/healthCheck');
const scenariosController = require('../controllers/scenarios');

module.exports = (opts = {}) => {
  const router = new Router();

  router.use(bodyParser());
  router.use(cors(opts.corsOptions));
  router.get('/', healthController.healtchCheck);
  router.get('/swagger', (ctx) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = fs.createReadStream('public/swagger-ui/index.html')
    return ctx;
  });

  const workflows = Router();
  workflows.prefix('/workflows');
  workflows.get('/:id/scenarios',
    baseValidator.validateUUID,
    scenariosController.getScenariosByWorkflowId
  );
  workflows.post('/:id/scenarios/save',
    baseValidator.validateUUID,
    scenariosController.saveScenariosForWorkflowId
  );
  workflows.del('/:id/scenarios',
    baseValidator.validateUUID,
    scenariosController.deleteScenariosByWorkflowId
  );

  const scenarios = Router();
  scenarios.prefix('/scenarios');
  scenarios.patch(
    '/:id',
    baseValidator.validateUUID,
    validateScenario.validateUpdateScenarioName,
    scenariosController.updateScenarioName
  );
  scenarios.post('/calculate',
    validateScenario.validateCalculateScenariosForBlueprint,
    scenariosController.calculateScenariosForBlueprint
  );
  
  router.use(workflows.routes());
  router.use(scenarios.routes());

  return router; 
}
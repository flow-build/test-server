const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const fs = require('fs');
const baseValidator = require('../validators/base');
const validatePath = require('../validators/paths');
const validateFeature = require('../validators/features');
const healthController = require('../controllers/healthCheck');
const pathsController = require('../controllers/paths');
const featuresController = require('../controllers/features');

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
  workflows.get('/:id/paths',
    baseValidator.validateUUID,
    pathsController.getPathsByWorkflowId
  );
  workflows.post('/:id/paths/save',
    baseValidator.validateUUID,
    pathsController.savePathsForWorkflowId
  );
  workflows.del('/:id/paths',
    baseValidator.validateUUID,
    pathsController.deletePathsByWorkflowId
  );

  const paths = Router();
  paths.prefix('/paths');
  paths.patch(
    '/:id',
    baseValidator.validateUUID,
    validatePath.validateUpdatePathName,
    pathsController.updatePathName
  );
  paths.post('/calculate',
    validatePath.validateCalculatePathsForBlueprint,
    pathsController.calculatePathsForBlueprint
  );
  
  const features = Router();
  features.prefix('/features');
  features.get('/',
    featuresController.getAllFeatures
  );
  features.post('/',
    validateFeature.validateSaveFeature,
    featuresController.saveFeature
  );
  features.del('/:id',
    baseValidator.validateUUID,
    featuresController.deleteFeature
  );

  router.use(workflows.routes());
  router.use(paths.routes());
  router.use(features.routes());

  return router; 
}
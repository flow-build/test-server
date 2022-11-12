const { logger } = require('../utils/logger');
const pathsServices = require('../services/paths');

const getPathsByWorkflowId = async (ctx, next) => {
  logger.debug('getPathsByWorkflowId controller called');

  const workflow_id = ctx.params.id;

  try {
    const data = await pathsServices.getPathsByWorkflowId(workflow_id);

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

const getPathsByWorkflowName = async (ctx, next) => {
  logger.debug('getPathsByWorkflowName controller called');

  const { workflow_name } = ctx.params;

  try {
    const data = await pathsServices.getPathsByWorkflowName(workflow_name);

    if (data.length === 0) {
      ctx.status = 404
      ctx.body = {
        message: `paths not found for workflow '${workflow_name}'`
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

const calculatePathsForBlueprint = async (ctx, next) => {
  logger.debug('calculatePathsForBlueprint controller called');

  const blueprint = ctx.request.body;
  const { strategy } = ctx.query;

  try {
    const allPaths = await pathsServices.calculatePathsForBlueprint(blueprint);

    if (strategy === 'persist') {
      if (!blueprint.workflow_id) {
        ctx.status = 400;
        ctx.body = {
          message: "Must provide 'workflow_id' to persist paths"
        }
      } else if (!blueprint?.name) {
        ctx.status = 400;
        ctx.body = {
          message: "Must provide workflow 'name' to persist paths"
        }
      } else {
        const data = await pathsServices.getPathsByWorkflowId(blueprint.workflow_id);
      
        if (data.length === 0) {
          const pathsSaved = await pathsServices.savePaths(blueprint.workflow_id, allPaths.paths, blueprint?.name);
    
          ctx.status = 201;
          ctx.body = pathsSaved;
        } else {
          ctx.status = 400;
          ctx.body = {
            message: `Paths already exists for workflow_id: ${blueprint.workflow_id}`
          }
        }
      }
    } else {
      ctx.status = 200;
      ctx.body = allPaths;
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const savePathsForWorkflowId = async (ctx, next) => {
  logger.debug('savePathsForWorkflowId controller called');

  const { id } = ctx.params;

  try {
    const data = await pathsServices.getPathsByWorkflowId(id);

    if (data.length === 0) {
      const {blueprint, error} = await pathsServices.getWorkflowFromFlowbuild(id);

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
        const { paths } = await pathsServices.calculatePathsForBlueprint(blueprint);
        const pathsSaved = await pathsServices.savePaths(id, paths, blueprint?.name);

        ctx.status = 201;
        ctx.body = pathsSaved;
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        message: `Paths already exists for workflow_id: ${id}`
      }
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const updatePathName = async (ctx, next) => {
  logger.debug('updatePathName controller called');

  const { id } = ctx.params;
  const { name } = ctx.request.body;

  try {
    const data = await pathsServices.getPathById(id);

    if (!data) {
      ctx.status = 404;
      ctx.body = {
        message: 'Path not found'
      }
    } else {
      const pathUpdated = await pathsServices.updatePathName(id, name);
      
      ctx.status = 200;
      ctx.body = pathUpdated;
    }
  } catch (err) {
    throw new Error(err);
  }

  return next();
}

const deletePathsByWorkflowId = async (ctx, next) => {
  logger.debug('deletePathsByWorkflowId controller called');

  const workflow_id = ctx.params.id;

  try {
    const pathsDeleted = await pathsServices.deletePathsByWorkflowId(workflow_id);

    if (pathsDeleted) {
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
  getPathsByWorkflowId,
  getPathsByWorkflowName,
  calculatePathsForBlueprint,
  savePathsForWorkflowId,
  updatePathName,
  deletePathsByWorkflowId
}
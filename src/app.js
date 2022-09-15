const Koa = require('koa');
const koaLogger = require('koa-logger-winston');
const cors = require('koa2-cors');
const serve = require('koa-static');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const { logger } = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routers/router');

const startServer = (port) => {

  const app = new Koa();

  const corsOptions = {
    origin: '*',
    allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.use(cors(corsOptions));
  app.use(koaLogger(logger));

  app.use(serve(pathToSwaggerUi, { index: false }))
  app.use(serve('public/swagger-ui', { index: false }))
  app.use(serve('src/swagger', { index: false }))

  app.use(errorHandler);

  app.use(router({ corsOptions }).routes())

  return app.listen(port, () => {
    logger.info(`Server running on port: ${port}`)
  });
}

module.exports = {
  startServer
}
const Koa = require('koa');
const koaLogger = require('koa-logger-winston');
const cors = require('koa2-cors');
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

  app.use(errorHandler);

  app.use(router({ corsOptions }).routes())

  return app.listen(port, () => {
    logger.info(`Server running on port: ${port}`)
  });
}

module.exports = {
  startServer
}
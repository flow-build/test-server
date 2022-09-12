const { startServer } = require('./app');
const port = process.env.PORT || 8080;

const server = startServer(port);

module.exports = server;
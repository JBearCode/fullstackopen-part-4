/* eslint-disable no-unused-vars */

const app = require('./app'); // the actual Express application
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
// may note be necessary
const cors = require('cors');
const mongoose = require('mongoose');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
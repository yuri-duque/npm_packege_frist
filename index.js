const log = require('./lib/lambdaLog');
const test = require('backend-modules');

test.log.info("teste");

module.exports = { log }
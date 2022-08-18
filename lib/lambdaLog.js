const { LambdaLog } = require('lambda-log');
const { MyConsole } = require('./myConsole');

const log = new LambdaLog({
    levelKey: null, messageKey: 'message',
    logHandler: new MyConsole(),
    dynamicMeta: function (message) {
        const now = new Date()
        const result = {
            timestamp: now.getTime(),
            at: now.toISOString()
        }
        if (message.level) {
            result['level'] = ('' + message.level).toUpperCase()
        }

        return result;
    }
});

log.options.meta.env = 'dev-meta';

/**
 * Initialize the log to configure the request-id on all logs after this one
 * @param {object}        [context={}] Context of request.
 */
function init(context){
    log.options.meta.lambda = { request_id: context.awsRequestId }
}

/**
 * log with level "info"
 * @param {*}             msg       Message to log. Can be any type, but string or `Error` reccommended.
 * @param {object}        [meta={}] Optional meta data to attach to the log.
 * @param {string[]}      [tags=[]] Additional tags to append to this log.
 */
function info(message, object, tags){
    if(!validateParams(message, object, tags, "info"))
        return;

    log.info(message, object, tags);
}

/**
 * log with level "warn"
 * @param {*}             msg       Message to log. Can be any type, but string or `Error` reccommended.
 * @param {object}        [meta={}] Optional meta data to attach to the log.
 * @param {string[]}      [tags=[]] Additional tags to append to this log.
 */
 function warn(message, object, tags){
    if(!validateParams(message, object, tags, "error"))
        return;

    log.info(message, object, tags);
}

/**
 * log with level "error"
 * @param {*}             msg       Message to log. Can be any type, but string or `Error` reccommended.
 * @param {object}        [meta={}] Optional meta data to attach to the log.
 * @param {string[]}      [tags=[]] Additional tags to append to this log.
 */
 function error(message, object, tags){
    if(!validateParams(message, object, tags, "error"))
        return;

    log.error(message, object, tags);
}

function validateParams(message, object, tags, logLevel){
    if(typeof message !== 'string'){
        log.error(`log.${logLevel} - error - message is not type string`);
        return false;
    }

    if(object && typeof object !== 'object'){
        log.error(`log.${logLevel} - error - message is not type string`);
        return false;
    }

    if(tags && !Array.isArray(tags)){
        log.error(`log.${logLevel} - error - message is not type string`);
        return false;
    }

    return true;
}

module.exports = {init, info, warn, error};
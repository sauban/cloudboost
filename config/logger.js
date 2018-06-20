var config = require('./config');
var bunyan  = require('bunyan'),
    BunyanSlack = require('bunyan-slack'),
    Bunyan2Loggly = require('bunyan-loggly');

module.exports = function () {
    var logglyTags = config.logglyTags ? config.logglyTags.split(',') : [];
    var logger;
    
    if(config.slackWebHook){
        logger = bunyan.createLogger({
            name: 'cloudboostApp',
            stream: new BunyanSlack({
                webhook_url: config.slackWebHook,
                icon_url: config.slackIconUrl,
                channel: config.slackChannel,
                username: "API ERROR BOT - " + config.env,
                level: 'error',
                handleExceptions: true,
                type: 'raw',
                customFormatter: function (level, message, meta) {
                    return {
                        attachments: [{
                            fallback: "An Error occured on API POD in - " + config.env,
                            pretext: "An Error occured on API POD in - " + config.env,
                            color: '#D00000',
                            fields: [{
                                title: meta.error,
                                value: meta.stack,
                                short: false
                            }]
                        }]
                    };
                }
            }),
            level: 'error'
        });
    } else {
        logger = bunyan.createLogger('cloudboostApp');
    }
    
    
    logger.addStream({
        name: 'cloudboostAppStream',
        stream: process.stderr,
        level: 'debug'
    });
    
    if(config.logglySubDomain){
        let logglyConfig =  {
            token: config.logToken,
            subdomain: config.logglySubDomain,
            tags: logglyTags,
            json: true,
        };
    
        let logglyStream = new Bunyan2Loggly(logglyConfig);
        
        logger.addStream({
            name: 'cloudboostLogglyStreams',
            stream: logglyStream,
            level: 'info',
            type: 'raw'
        });
    }

    return logger;
};
var keyService = require('../database-connect/keyService');
var serverService = require('../services/server');

var config = require('./config');

module.exports = function () {
    try {
        var db = require('../database-connect/mongoConnect.js').connect();
        db.then(function (dbc) {
            try {
                config.mongoClient = dbc;
                //Init Secure key for this cluster. Secure key is used for Encryption / Creating apps , etc.
                keyService.initSecureKey().then(function (key) {
                    global.logger.info("Secure Key: " + key);
                    global.logger.info("IMPORTANT: Please keep Secure Key private. Revealing it would make your server vulnerable.");
                    serverService.registerServer(key);
                }, function (error) {
                    global.logger.error(error);
                    global.logger.error("Failed to initialize Secure Key. Please check if MongoDB is connected and restart server.");
                });
                //Cluster Key is used to differentiate which cluster is the request coming from in Analytics.
                keyService.initClusterKey();
            } catch (e) {
                global.logger.error({
                    "error": String(e),
                    "stack": new Error().stack
                });
            }
        }, function (e) {
            global.logger.error(e);
            // exit server if connection to mongo was not made
            process.exit(1);
        });

    } catch (err) {
        global.logger.log('error', {
            "error": String(err),
            "stack": new Error().stack
        });
    }
};

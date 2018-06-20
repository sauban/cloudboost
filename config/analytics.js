var config = require('./config');

module.exports = function () {
    if (process.env["CLOUDBOOST_ANALYTICS_SERVICE_HOST"] || process.env["CLOUDBOOST_ANALYTICS_STAGING_SERVICE_HOST"]) {
        //this is running on Kubernetes
        if (process.env["IS_STAGING"]) {
            if (process.env["CLOUDBOOST_ANALYTICS_STAGING_SERVICE_HOST"]) {
                config.analyticsUrl = "http://" + process.env["CLOUDBOOST_ANALYTICS_STAGING_SERVICE_HOST"];
            }
        } else {
            config.analyticsUrl = "http://" + process.env["CLOUDBOOST_ANALYTICS_SERVICE_HOST"];
        }
    } else {
        config.analyticsUrl = "http://localhost:5555";
    }

    return config.analyticsUrl;
};
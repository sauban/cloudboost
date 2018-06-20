
/*
#     CloudBoost - Core Engine that powers Bakend as a Service
#     (c) 2014 HackerBay, Inc. 
#     CloudBoost may be freely distributed under the Apache 2 License
*/

var appService = require('../../services/app');
var emailService = require('../../services/cloudEmail');

module.exports = function (app) {

    /**
     *Description : Send Email to all users in the selected aplication
     *Params: 
     *- Param secureKey: Secure key of System
     *Returns:
     -Success : success on emails sent
     -Error : Error Data( 'Server Error' : status 500 )
     */
    app.post('/email/:appId/campaign', function (req, res) {
        
        try {
            var appId = req.params.appId;
            var appKey = req.body.key;
            var query = req.body.query;
            var emailBody = req.body.emailBody;
            var emailSubject = req.body.emailSubject;

            appService.isMasterKey(appId, appKey).then(function (isMasterKey) {
                if (isMasterKey) {
                    emailService.sendEmail(appId, emailBody, emailSubject, query, isMasterKey).then(function () {
                        res.status(200).send(null);
                    }, function (err) {
                        if (err === "Email Configuration is not found." || err === "No users found") {
                            res.status(400).send({ error: err });
                        } else {
                            res.status(400).json({ message: "Something went wrong", error: err });
                        }
                    });
                } else {
                    res.status(401).send({ status: 'Unauthorized' });
                }
            }, function (error) {
                global.logger.error(error);
                return res.status(400).send('Cannot retrieve security keys.');
            });
        } catch (e) {
            global.logger.error(e);
            return res.status(500).send('Server error');
        }


    });

};



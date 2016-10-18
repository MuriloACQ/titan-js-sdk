'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');

var endpoint = require('../config/env.config').endpoint;
var smsPath = 'v2/sms';
function SMSService() {
}

function send(smsInfo) {
    return $http.post(endpoint, smsInfo);
}

SMSService.prototype.sendSMS = function(smsInfo){
    var smsEndpoint = endpoint + smsPath;

    return req(RequestConfig.generateOptions(RequestConfig.POST, smsEndpoint, smsInfo))
        .then(function (response) {
            return (JSON.parse(response));
        });
};

module.exports = SMSService;
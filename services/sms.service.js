'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var sendSmsPath = 'v2/sms';

function SMSService() {
}


function send(smsInfo) {
    return $http.post(endpoint, smsInfo);
}

SMSService.prototype.sendSMS = function(smsInfo){
    var smsEndpoint = endpoint + sendSmsPath;

    return req(RequestConfig.generateOptions(RequestConfig.POST, smsEndpoint, smsInfo))
        .then(function (response) {
            return (JSON.parse(response));
        }, function (err) {
            Intercecptor.callInterceptor(err);
        });
};

module.exports = SMSService;
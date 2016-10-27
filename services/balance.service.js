'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');

var endpoint = require('../config/env.config').endpoint;
var balancePath = 'tcs-balances?externalId=';
function BalanceService() {
}

BalanceService.prototype.getFullBalance = function (deviceId) {
    var customerEndpoint = endpoint + balancePath + deviceId + '&deviceId=' + deviceId;
    return RequestConfig.createRequest(RequestConfig.GET, customerEndpoint)
    // return req(RequestConfig.generateOptions(RequestConfig.GET, customerEndpoint))
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = BalanceService;
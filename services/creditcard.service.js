'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var devicePath = 'devices/';
var ccPath = 'creditcards/';
function CreditCardService() {
}


CreditCardService.prototype.setPrimaryCard = function(cardToken){
    var ccEndpoint = endpoint + ccPath + cardToken;

    return RequestConfig.createRequest(RequestConfig.PATCH, ccEndpoint)
    // var options = RequestConfig.generateOptions(RequestConfig.GET, ccEndpoint);
    // return req(options)
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

CreditCardService.prototype.getCreditCardsByAccount = function () {
    var ccEndpoint = endpoint + devicePath + RequestConfig.getTokenData().device + '/creditcards';

    return RequestConfig.createRequest(RequestConfig.GET, ccEndpoint)
    // var options = RequestConfig.generateOptions(RequestConfig.GET, ccEndpoint);
    // return req(options)
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = CreditCardService;
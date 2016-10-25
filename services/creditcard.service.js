'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var ccPath = 'creditcards';
function CreditCardService() {
}


CreditCardService.prototype.getCreditCardsByAccount = function () {
    var ccEndpoint = endpoint + ccPath;
    var options = RequestConfig.generateOptions(RequestConfig.GET, ccEndpoint);
    return req(options)
        .then(function (response) {
            return (JSON.parse(response));
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = CreditCardService;
'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var paymentPath = 'payments';
function PaymentService() {
}


PaymentService.prototype.createPayment = function (paymentInfo) {
    paymentInfo.sourceType = 'cielo';
    var paymentEndpoint = endpoint + paymentPath;
    console.info(paymentInfo);
    var options = RequestConfig.generateOptions(RequestConfig.POST, paymentEndpoint, JSON.stringify(paymentInfo));
    console.info(options);
    return req(options)
        .then(function (response) {
            return (JSON.parse(response));
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = PaymentService;
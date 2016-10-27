'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var user = require('../config/user.config');
var paymentPath = 'payments';
function PaymentService() {
}


PaymentService.prototype.createPayment = function (paymentInfo) {
    paymentInfo.sourceType = 'cielo';
    if(paymentInfo.credentials && user.getUserEmail()){
        paymentInfo.credentials.email = user.getUserEmail();
    }
    var paymentEndpoint = endpoint + paymentPath;
    return RequestConfig.createRequest(RequestConfig.POST,paymentEndpoint, paymentInfo)
    // var options = RequestConfig.generateOptions(RequestConfig.POST, paymentEndpoint, JSON.stringify(paymentInfo));
    // return req(options)
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = PaymentService;
'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var emailPath = 'email';
var queryString = require('./query.service');

function EmailService() {
}

EmailService.prototype.validate = function (token) {
    var queries = queryString.toQueryString({token: token});
    var emailEndpoint = endpoint + emailPath + queries;

    // var options = RequestConfig.generateOptions('PATCH', emailEndpoint, {confirmedEmail: true});

    // var opts = Object.assign({resolveWithFullResponse: true}, options);
    return RequestConfig.createRequest(RequestConfig.PATCH, emailEndpoint, {confirmedEmail: true})
    // return req(opts)
        .then(function (response) {
        return response;
    }, function (err) {
        Interceptor.callInterceptor(err);
        throw err;
    });
};

EmailService.prototype.resendConfirmationEmail = function () {
    var emailEndpoint = endpoint + emailPath;

    return RequestConfig.createRequest(RequestConfig.POST, emailEndpoint, {})
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = EmailService;
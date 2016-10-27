'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var userPath = 'userId';
var accountPath = 'accounts';
function UserService() {
}

UserService.prototype.createAccount = function (account) {
    var accountEndpoint = endpoint + accountPath;

    var options = RequestConfig.generateOptions(RequestConfig.POST, accountEndpoint, account);

    var opts = Object.assign({json: true}, options);

    return req(opts)
        .then(function (response) {
            return response;
        }).catch(function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

UserService.prototype.createUser = function (userInfo) {
    userInfo.defaultDDD = 41;
    var userEndpoint = endpoint + userPath;
    return RequestConfig.createRequest(RequestConfig.POST, userEndpoint, userInfo)
    // return req(RequestConfig.generateOptions(RequestConfig.POST, userEndpoint, userInfo))
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

UserService.prototype.getUser = function (userId) {
    var userEndpoint = endpoint + userPath + '/' + userId;
    return RequestConfig.createRequest(RequestConfig.GET, userEndpoint)
    // return req(RequestConfig.generateOptions(RequestConfig.GET, userEndpoint))
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = UserService;
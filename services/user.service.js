'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');

var endpoint = require('../config/env.config').endpoint;
var userPath = 'userId';
var accountPath = 'accounts';
function UserService() {
}

UserService.prototype.createAccount = function(account) {
    var accountEndpoint = endpoint + accountPath;
    return req(RequestConfig.generateOptions(RequestConfig.POST, accountEndpoint, account))
        .then(function (response) {
            return (JSON.parse(response));
        });
};

UserService.prototype.createUser =function(userInfo){
    userInfo.defaultDDD = 41;
    var userEndpoint = endpoint + userPath;
    return req(RequestConfig.generateOptions(RequestConfig.POST, userEndpoint, userInfo))
        .then(function (response) {
            return (JSON.parse(response));
        });
};

UserService.prototype.getUser = function(userId){
    var userEndpoint = endpoint + userPath + '/' + userId;
    return req(RequestConfig.generateOptions(RequestConfig.GET, userEndpoint))
        .then(function (response) {
            return (JSON.parse(response));
        });
};

module.exports = UserService;
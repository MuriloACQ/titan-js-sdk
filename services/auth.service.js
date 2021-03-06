'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var user = require('../config/user.config');

var endpoint = require('../config/env.config').endpoint;
var authPath = 'auth';
var refreshPath = 'refresh';
function AuthService() {
}


/**
 * Method to authenticate with Titan system.
 *
 * @param {credentials} credentials This is an object containing email and password attr.
 * @param {boolean} saveToken This is an optional boolean to save/or not the accessToken in the headers requests in case of success;
 * @return {object} This returns an http response. In case of success it will return an accessToken and refreshToken encapsulated in an object.
 */
AuthService.prototype.auth = function (credentials, saveToken) {

    return RequestConfig.createRequest(RequestConfig.POST, endpoint + authPath, credentials)
    // return req(RequestConfig.generateOptions(RequestConfig.POST, endpoint + authPath, JSON.stringify(credentials)))
        .then(function (response) {
            response = response.data;
            user.setUserEmail(credentials.email);
            if (saveToken) {
                RequestConfig.setAccessToken(response.accessToken);
            }
            return response;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

AuthService.prototype.refreshToken = function (tokens, saveToken) {
    var customHeaders = {
        'Content-Type' : 'application/json',
        'x-token' : tokens['accessToken'],
        'refresh-token' : tokens['refreshToken']
    };
    return RequestConfig.createRequest(RequestConfig.POST, endpoint + refreshPath, null, customHeaders)
        .then(function (response) {
            response = response.data;
            if (saveToken) {
                RequestConfig.setAccessToken(response.accessToken);
            }
            return response;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = AuthService;
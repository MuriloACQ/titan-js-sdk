'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');

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
    return req(RequestConfig.generateOptions(RequestConfig.POST, endpoint + authPath, JSON.stringify(credentials)))
        .then(function (response) {
            var parsedResponse = (JSON.parse(response));
            if (saveToken) {
                RequestConfig.setAccessToken(parsedResponse.accessToken);
            }
            return parsedResponse;
        });
};

AuthService.prototype.refreshToken = function (tokens, saveToken) {
    var customHeaders = {
        'Content-Type' : 'application/json',
        'x-token' : tokens['accessToken'],
        'refresh-token' : tokens['refreshToken']
    };
    return req(RequestConfig.generateOptions(RequestConfig.POST, endpoint + refreshPath, null, customHeaders))
        .then(function (response) {
            var parsedResponse = (JSON.parse(response));
            if (saveToken) {
                RequestConfig.setAccessToken(parsedResponse.accessToken);
            }
            return parsedResponse;
        });
};

module.exports = AuthService;
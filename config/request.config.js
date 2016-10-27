'use strict';
var accessToken = null;
var httpConfig = require('../config/http.config');
var jwtDecode = require('jwt-decode');
var POST = 'POST';
var PUT = 'PUT';
var GET = 'GET';
var PATCH = 'PATCH';

function getTokenData() {
    try {
        return jwtDecode(accessToken);
    } catch (err) {
        return {};
    }

}

function createRequest(type, endpoint, body, customHeaders) {
    customHeaders = customHeaders || {};
    customHeaders['Content-Type'] = customHeaders['Content-Type'] || 'application/json';
    customHeaders['x-token'] = accessToken;
    if (httpConfig.http) {
        return httpConfig.http({
            method: type,
            url: endpoint,
            data: body,
            headers: customHeaders
        })
            .then(function (response) {
                try {
                    return typeof response === 'string' ? (JSON.parse(response)) : response;
                } catch (err) {
                    return response;
                }
            });
    } else {
        var options = generateOptions(type, endpoint, body, customHeaders);
        return httpConfig.req(options)
            .then(function (data) {
                try {
                    var response = {data : typeof data === 'string' ? (JSON.parse(data)) : data};
                    return {
                        data : response.data.body,
                        headers : response.data.headers
                    }
                } catch (err) {
                    return {data : data};
                }
            });
    }
}

function setAccessToken(aToken) {
    accessToken = aToken;
}

function removeAccessToken() {
    accessToken = null;
}

function getAccessToken() {
    return accessToken;
}


function generateOptions(methodType, url, body, customHeaders) {
    var headers = {};

    if (customHeaders) {
        headers = customHeaders;
    } else {
        headers['Content-Type'] = 'application/json';
    }

    if (accessToken && !headers['x-token']) {
        headers['x-token'] = accessToken;
    }

    return {
        method: methodType,
        uri: url,
        headers: headers,
        body: body,
        json: true,
        resolveWithFullResponse: true,
        withCredentials: false
    }
}


module.exports.setAccessToken = setAccessToken;
module.exports.getAccessToken = getAccessToken;
module.exports.removeAccessToken = removeAccessToken;
module.exports.POST = POST;
module.exports.PUT = PUT;
module.exports.GET = GET;
module.exports.PATCH = PATCH;
module.exports.getTokenData = getTokenData;
module.exports.generateOptions = generateOptions;
module.exports.createRequest = createRequest;
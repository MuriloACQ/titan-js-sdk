'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var devicesPath = 'devices/';
var listCallsPath = '/calls';
var queryString = require('./query.service');

function CallService() {
}

CallService.prototype.list = function (device, initialDate, finalDate, initialRangeItem, finalRangeItem) {
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var callsListEndpoint = endpoint + devicesPath + device + listCallsPath;
    if (queries) {
        callsListEndpoint += queries;
    }

    initialRangeItem = initialRangeItem || '0';
    var options = RequestConfig.generateOptions(RequestConfig.GET, callsListEndpoint,
        null, {range: 'items= ' + initialRangeItem + '-' + finalRangeItem});
    var opts = Object.assign({resolveWithFullResponse: true}, options);

    return req(opts).then(function (response) {
        return {
            data: JSON.parse(response.body),
            info: {
                total: response.headers['content-range'].split('/')[1]
            }
        };
    }, function (err) {
        Interceptor.callInterceptor(err);
        throw err;
    });
};

CallService.prototype.listLasts = function (device, qty) {
    var initialDate = null, finalDate = null, initialRangeItem = null, finalRangeItem = 0;
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var callsListEndpoint = endpoint + devicesPath + device + listCallsPath;
    if (queries) {
        callsListEndpoint += queries;
    }

    initialRangeItem = initialRangeItem || '0';

    return req(RequestConfig.generateOptions(RequestConfig.GET, callsListEndpoint,
        null, {range: 'items= ' + initialRangeItem + '-' + finalRangeItem})).then(function (response) {
        return JSON.parse(response);
    }, function (err) {
        Interceptor.callInterceptor(err);
        throw err;
    });
};

module.exports = CallService;
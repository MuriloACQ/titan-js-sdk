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

CallService.prototype.getInfo = function (device, initialDate, finalDate) {
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var callsListEndpoint = endpoint + devicesPath + device + listCallsPath;
    if (queries) {
        callsListEndpoint += queries;
    }

    return RequestConfig.createRequest(RequestConfig.GET, callsListEndpoint)
    // return req(RequestConfig.generateOptions(RequestConfig.GET, callsListEndpoint, null))
        .then(function (response) {
        var list = response.data;
        var result = {
            total: list.length,
            totalPrice: 0,
            totalTime: 0
        };
        list.forEach(function (item) {
            result.totalPrice += Number(item.call_cost);
            result.totalTime += Number(item.duration);
        });
        return result;
    }, function (err) {
        Interceptor.callInterceptor(err);
        throw err;
    });
};

CallService.prototype.list = function (device, initialDate, finalDate, initialRangeItem, finalRangeItem) {
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var callsListEndpoint = endpoint + devicesPath + device + listCallsPath;
    if (queries) {
        callsListEndpoint += queries;
    }

    initialRangeItem = initialRangeItem || '0';
    // var options = RequestConfig.generateOptions(RequestConfig.GET, callsListEndpoint,
    //     null, {range: 'items= ' + initialRangeItem + '-' + finalRangeItem});
    // var opts = Object.assign({resolveWithFullResponse: true}, options);
    return RequestConfig.createRequest(RequestConfig.GET, callsListEndpoint, null, {
        range: 'items= ' + initialRangeItem + '-' + finalRangeItem
    })
    // return req(opts)
    .then(function (response) {
        return {
            data: response.data,
            info: {
                total: (response.headers['content-range'] || response.headers('content-range')).split('/')[1]
            }
        };
    }, function (err) {
        Interceptor.callInterceptor(err);
        throw err;
    });
};

CallService.prototype.listLasts = function (device, qty) {
    return this.list(device, null, null, null, qty);
};

module.exports = CallService;
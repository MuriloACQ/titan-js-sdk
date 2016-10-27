'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var sendSmsPath = 'v2/sms';
var devicesPath = 'devices/';
var listSmsPath = '/sms';
var queryString = require('./query.service');

function SMSService() {
}

SMSService.prototype.sendSMS = function (smsInfo) {
    var smsEndpoint = endpoint + sendSmsPath;

    return RequestConfig.createRequest(RequestConfig.POST, smsEndpoint, smsInfo)
    // return req(RequestConfig.generateOptions(RequestConfig.POST, smsEndpoint, smsInfo))
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

SMSService.prototype.getInfo = function (device, initialDate, finalDate) {
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var smsListEndpoint = endpoint + devicesPath + device + listSmsPath;
    if (queries) {
        smsListEndpoint += queries;
    }
    return RequestConfig.createRequest(RequestConfig.GET, smsListEndpoint, null)
    // return req(RequestConfig.generateOptions(RequestConfig.GET, smsListEndpoint, null))
        .then(function (response) {
            var list = response.data;
            var result = {
                total: list.length,
                totalPrice: 0
            };
            list.forEach(function (item) {
                result.totalPrice += Number(item.price);
            });
            return result;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

SMSService.prototype.list = function (device, initialDate, finalDate, initialRangeItem, finalRangeItem) {
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var smsListEndpoint = endpoint + devicesPath + device + listSmsPath;
    if (queries) {
        smsListEndpoint += queries;
    }

    initialRangeItem = initialRangeItem || '0';
    return RequestConfig.createRequest(RequestConfig.GET, smsListEndpoint, null, {
        range: 'items= ' + initialRangeItem + '-' + finalRangeItem
    })
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

SMSService.prototype.listLasts = function (device, qty) {
    return this.list(device, null, null, null, qty);
};

module.exports = SMSService;
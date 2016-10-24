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

    return req(RequestConfig.generateOptions(RequestConfig.POST, smsEndpoint, smsInfo))
        .then(function (response) {
            return (JSON.parse(response));
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

SMSService.prototype.list = function (device, initialDate, finalDate, initialRangeItem, finalRangeItem) {
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var smsListEndpoint = endpoint + devicesPath + device + listSmsPath;
    if (queries) {
        smsListEndpoint += '?' + queries;
    }

    initialRangeItem = initialRangeItem || '';

    return req(RequestConfig.generateOptions(RequestConfig.GET, smsListEndpoint,
        null, {range: 'items ' + initialRangeItem + '-' + finalRangeItem})).then(function (response) {
        return (JSON.parse(response));
    }, function (err) {
        Interceptor.callInterceptor(err);
        throw err;
    });
};

SMSService.prototype.listLasts = function (device, qty) {
    return this.list(device, null, null, null, qty);
};

module.exports = SMSService;
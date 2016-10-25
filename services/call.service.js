'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');
var endpoint = require('../config/env.config').endpoint;
var sendSmsPath = 'v2/sms';
var devicesPath = 'devices/';
var listSmsPath = '/calls';
var queryString = require('./query.service');

function CallService() {
}

CallService.prototype.list = function (device, initialDate, finalDate, initialRangeItem, finalRangeItem) {
    var queries = queryString.toQueryString({initialDate: initialDate, finalDate: finalDate});
    var smsListEndpoint = endpoint + devicesPath + device + listSmsPath;
    if (queries) {
        smsListEndpoint += queries;
    }

    initialRangeItem = initialRangeItem || '';
    console.log('params', device, initialDate, finalDate, initialRangeItem, finalRangeItem);
    var options = RequestConfig.generateOptions(RequestConfig.GET, smsListEndpoint,
        null, {range: 'items= ' + initialRangeItem.toString() + '-' + finalRangeItem.toString()});
    console.log(options);
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
    return this.list(device, null, null, null, qty);
};

module.exports = CallService;
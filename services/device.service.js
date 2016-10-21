'use strict';
var req = require('request-promise');
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');

var endpoint = require('../config/env.config').endpoint;
var devicesPath = 'devices';
function DeviceService() {
}

DeviceService.prototype.getDevice = function (deviceId) {
    var deviceEndpoint = endpoint + devicesPath + '/' + deviceId;
    return req(RequestConfig.generateOptions(RequestConfig.GET, deviceEndpoint))
        .then(function (response) {
            return (JSON.parse(response));
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

DeviceService.prototype.createDevice = function (deviceId, deviceInfo) {
    var deviceEndpoint = endpoint + devicesPath + '/' + deviceId;
    return req(RequestConfig.generateOptions(RequestConfig.PUT, deviceEndpoint, deviceInfo))
        .then(function (response) {
            return (JSON.parse(response));
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

DeviceService.prototype.getDeviceReports = function (deviceId) {
    var extractEndpoint = endpoint + devicesPath + '/' + deviceId + '/sms';
    return req(RequestConfig.generateOptions(RequestConfig.GET, extractEndpoint))
        .then(function (response) {
            return (JSON.parse(response));
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = DeviceService;
'use strict';
var RequestConfig = require('../config/request.config');
var Interceptor = require('../config/interceptor.config');

var endpoint = require('../config/env.config').endpoint;
var publicPlansPath = 'publicplans';

function PlanService() {}

PlanService.prototype.getPlans = function () {
    var plansEndpoint = endpoint + publicPlansPath;
    return RequestConfig.createRequest(RequestConfig.GET, plansEndpoint)
        .then(function (response) {
            return response.data;
        }, function (err) {
            Interceptor.callInterceptor(err);
            throw err;
        });
};

module.exports = PlanService;
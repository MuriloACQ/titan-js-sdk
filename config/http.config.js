'use strict';

var http = null;
var req = require('request-promise');
function init() {

    try {
        if (window.angular) {
            var initInjector = angular.injector(['ng']);
            http = initInjector.get('$http');
            console.info('Titanjs SDK will use $http resource from angularjs');
        }else{
            console.info('Titanjs SDK will use request-promise from node modules');
        }

    } catch (e) {
        console.info('Not using angularjs. Titanjs SDK will use request-promise');
    }

}

init();

module.exports = {
    http: http,
    req: req
};
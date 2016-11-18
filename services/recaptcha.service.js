'use strict';
var config = require('../config/env.config');
var req = require('request-promise');
var secret = '6Lc2EQcUAAAAAAbhq2P9NkorGs3bjsehHyR-xz43';

function RecaptchaService() {
}

RecaptchaService.prototype.verifyCaptcha = function (responseString) {
    if (!responseString)
        throw 'response is required';
    return req({
        method: 'GET',
        url: 'https://www.google.com' + '/recaptcha/api/siteverify?secret=' + secret + '&response=' + responseString
    });
};

module.exports = RecaptchaService;
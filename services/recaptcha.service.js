'use strict';
var config = require('../config/env.config');
var req = require('request-promise');
var secret = config.captchaSecret;

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
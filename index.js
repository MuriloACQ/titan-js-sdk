'use strict';
(function () {

    var AuthService = require('./services/auth.service'),
        BalanceService = require('./services/balance.service'),
        DeviceService = require('./services/device.service'),
        UserService = require('./services/user.service'),
        PaymentService = require('./services/payment.service'),
        SMSService = require('./services/sms.service'),
        RequestConfig = require('./config/request.config');

    var authService = new AuthService(),
        balanceService = new BalanceService(),
        deviceService = new DeviceService(),
        userService = new UserService(),
        paymentService = new PaymentService(),
        smsService = new SMSService();

    function TitanAPI() {

    }

    TitanAPI.prototype.helloWorld = function () {
        console.log('Hello World');
    };

    TitanAPI.prototype.setAccessToken = RequestConfig.setAccessToken;
    TitanAPI.prototype.removeAccessToken = RequestConfig.removeAccessToken;

    TitanAPI.prototype.authenticate = authService.auth;
    TitanAPI.prototype.refreshToken = authService.refreshToken;

    TitanAPI.prototype.getFullBalance = balanceService.getFullBalance;

    TitanAPI.prototype.getDevice = deviceService.getDevice;
    TitanAPI.prototype.getDeviceReports = deviceService.getDeviceReports;
    TitanAPI.prototype.createDevice = deviceService.createDevice;

    TitanAPI.prototype.createAccount = userService.createAccount;
    TitanAPI.prototype.getUser = userService.getUser;
    TitanAPI.prototype.createUser = userService.createUser;

    TitanAPI.prototype.createPayment = paymentService.createPayment;

    TitanAPI.prototype.sendSMS = smsService.sendSMS;


    window.TitanAPI = new TitanAPI();
})(window);
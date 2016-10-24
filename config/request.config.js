'use strict';
var accessToken = null;

var jwtDecode = require('jwt-decode');

function getTokenData(){
    try{
        return jwtDecode(accessToken);
    }catch(err){
        return {};
    }

}

function setAccessToken(aToken) {
    accessToken = aToken;
}

function removeAccessToken() {
    accessToken = null;
}

function getAccessToken() {
    return accessToken;
}


function generateOptions(methodType, url, body, customHeaders) {
    var headers = {};

    if(customHeaders){
        headers = customHeaders;
    }else{
        headers['Content-Type'] = 'application/json';
    }

    if (accessToken && !headers['x-token']) {
        headers['x-token'] = accessToken;
    }

    return {
        method: methodType,
        uri: url,
        headers: headers,
        body: body
    }
}
var POST = 'POST';
var PUT = 'PUT';
var GET = 'GET';

module.exports.setAccessToken = setAccessToken;
module.exports.getAccessToken = getAccessToken;
module.exports.removeAccessToken = removeAccessToken;
module.exports.POST = POST;
module.exports.PUT = PUT;
module.exports.GET = GET;
module.exports.getTokenData = getTokenData;
module.exports.generateOptions = generateOptions;
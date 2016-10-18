'use strict';

var accessToken = null;


function setAccessToken(aToken) {
    accessToken = aToken;
}

function removeAccessToken() {
    accessToken = null;
}


function generateOptions(methodType, url, body, customHeaders) {
    var headers = {};
    headers['Content-Type'] = 'application/json';
    if (accessToken) {
        headers['x-token'] = accessToken;
    }
    return {
        method: methodType,
        uri: url,
        headers: customHeaders ? customHeaders : headers,
        body: body
    }
}
var POST = 'POST';
var PUT = 'PUT';
var GET = 'GET';

module.exports.setAccessToken = setAccessToken;
module.exports.removeAccessToken = removeAccessToken;
module.exports.POST = POST;
module.exports.PUT = PUT;
module.exports.GET = GET;
module.exports.generateOptions = generateOptions;
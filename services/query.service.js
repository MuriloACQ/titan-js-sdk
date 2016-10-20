'use strict';
const queryString = require('query-string');
function toQueryString(object) {
    if(object){
        var stringified = queryString.stringify(object);
        if(stringified.length){
            stringified = '?' + stringified;
        }
        return stringified;
    }else{
        return '';
    }
}

module.exports.toQueryString = toQueryString;
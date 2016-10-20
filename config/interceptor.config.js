'use strict';

var errorInterceptor = null;

function setErrorInterceptor(errorFunction) {
    errorInterceptor = errorFunction;
}

function getErrorInterceptor(){
    return errorInterceptor;
}

function callInterceptor(err){
    if(errorInterceptor){
        errorInterceptor(err);
    }else{
        console.warn('No interceptor function has been set');
    }

}

module.exports.setErrorInterceptor = setErrorInterceptor;
module.exports.getErrorInterceptor = getErrorInterceptor;
module.exports.callInterceptor = callInterceptor;

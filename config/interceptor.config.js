'use strict';

var errorsInterceptor = [];

function addErrorInterceptor(errorFunction){
    errorsInterceptor.push(errorFunction);
}

function getErrorsInterceptor(){
    return errorsInterceptor;
}

function callInterceptor(err){
    if(errorsInterceptor.length){
        try{
            for(var i=0; i< errorsInterceptor.length; i++){
                errorsInterceptor[i](err);
            }
        }catch(err){
            console.err(err);
        }
    }else{
        console.warn('No interceptor function has been set');
    }

}

module.exports.addErrorInterceptor = addErrorInterceptor;
module.exports.getErrorsInterceptor = getErrorsInterceptor;
module.exports.callInterceptor = callInterceptor;

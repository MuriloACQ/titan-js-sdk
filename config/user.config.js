'use strict';
var userEmail = '';

function getUserEmail (){
    return userEmail;
}

function setUserEmail (email){
    userEmail = email
}


module.exports.getUserEmail = getUserEmail;
module.exports.setUserEmail = setUserEmail;
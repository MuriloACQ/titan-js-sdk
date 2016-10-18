# TITAN JS - SDK

This is the repository of the titan-js SDK for API usage. All API's calls runs as promised based requests.

## Usage
    - Install the last version in your frontend app using the following:
        - bower install --save titan-js-sdk
    - Import it in your index.html
        - <script src="bower_components/titan-js-sdk/dist/titan-sdk.js"></script>

## Methods implemented
These are the current implemented methos to use:

    - setAccessToken
    - removeAccessToken
    - authenticate
    - refreshToken
    - getFullBalance
    - getDevice
    - getDeviceReports
    - createDevice
    - createAccount
    - getUser
    - createUser
    - createPayment
    - sendSMS

## Basic Usage
This sdk creates a global variable called `TitanAPI`.
First of all, you can try to make a login request using `authenticate` method.

```
TitanAPI.authenticate({
    'email' : 'your-titan-registered-email',
    'password' : 'your-titan-password'
  }, true) //true is the optional to use accessToken in the headers on the next requests.
    .then(function(response){
      console.log(response); // Success auth
    }, function (err) {
      console.log(err); // Auth error
    });
```

## (Optional) Build your own dist:
    - run npm install.
    - Install browseify: npm install -g browserify
    - Do your changes.
    - Run the following command : browserify index.js -o dist/titan-sdk.js

###### Wiki comming soon
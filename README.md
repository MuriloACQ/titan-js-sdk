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
### Login
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
## Other Examples
### Create Account
```
TitanAPI.createAccount({
	"email": "user@mail.com",
	"password": "userpassword", //mininum lenght is set to 8. At least 1 special character, 1 number and 1 uppercase letter.
	"username": "string",
	"firstName": "string",
	"lastName": "string",
	"defaultDDD": "number" //number. By default you can pass 41
})
.then(function(response){
      console.log(response); // Success
    }, function (err) {
      console.log(err); // Error
    });
```
### Make a payment
```
TitanAPI.createPayment({
  "selectedPlan" : 'string', //currentPLans: 'Bronze', 'Prata', 'Ouro', 'Platina'.
      "card" :{
        "number" : card.number, //ex: 4242424242424242
        "holder" : card.holder, //holder name
        "expiration" : {
          "month" : month, //month expiration: 01 to 12
          "year" : card.expiration.year //year as YYYY
        },
        "brand" : card.brand, //supported brand from cielo
        "cvc" : card.cvc //cvc
      },
	"sourceType" : "cielo" //for now, we only support cielo
})
.then(function(response){
      console.log(response); // Success
    }, function (err) {
      console.log(err); // Error
    });
```



## Error Interceptor
You can add an error interceptor for our http requests. In a sample way to test you can add this code in your js project. It work as a list of interceptors, so you can add as many as you want.

```
    //you must add the err parameter.
    TitanAPI.addErrorInterceptor(function(err){
        console.log(err);
    });
```

## (Optional): Using $http from angular
If you use angular in your project, you can load titansdkd after you add angular script. Then the sdk will use $http instead of request-promise. Ex:

This will use $http
```
<script src="bower_components/angular/angular.js"></script>
...
<script src="bower_components/titan-js-sdk/dist/titan-sdk.js"></script>

```

This will use the default request-promise module
```
<script src="bower_components/titan-js-sdk/dist/titan-sdk.js"></script>
...
<script src="bower_components/angular/angular.js"></script>

```

## (Optional) Build your own dist:
    - run npm install.
    - Install browseify: npm install -g browserify
    - Do your changes.
    - Run the following command : browserify index.js -o dist/titan-sdk.js

###### Wiki comming soon
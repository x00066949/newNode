var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request');
let credentials = require('./keys.json');


// API to authorize application and generate access token.
const WWS_OAUTH_URL = "https://api.watsonwork.ibm.com/oauth/token";

// App ID retrieved from registration process.
const APP_ID = credentials.WATSON_APP_ID;

// App secret retrieved from registration process.
const APP_SECRET = credentials.WATSON_APP_SECRET;

// Build request options for authentication.
const authenticationOptions = {
    "method": "POST",
    "url": WWS_OAUTH_URL,
    "auth": {
      "user": APP_ID,
      "pass": APP_SECRET
    },
    "form": {
      "grant_type": "client_credentials"
    }
  };

if (!APP_ID || !APP_SECRET) {
  console.log("Please provide the app id and app secret as environment variables.");
  process.exit(1);
}

// Authorize application.
request(authenticationOptions, function(err, response, body){

  // If successful authentication, a 200 response code is returned
  if(response.statusCode == 200){
    console.log ("Authentication successful\n");
    console.log ("App Id: " + authenticationOptions.auth.user);
    console.log ("App Secret: " + authenticationOptions.auth.pass + "\n");
    console.log ("access_token:\n\n" + JSON.parse(body).access_token + "\n");
    console.log ("token_type: " + JSON.parse(body).token_type);
    console.log ("expires_in: " + JSON.parse(body).expires_in);
    console.log ("\n");
  } else {
    console.log("Error authenticating with\nApp: " + authenticationOptions.auth.user + "\nSecret: " + authenticationOptions.auth.pass + "\n\n");
  }
});




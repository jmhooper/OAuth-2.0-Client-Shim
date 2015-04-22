// Load the environment
process.env.PORT = 8008
process.env.CALLBACK_PATH = "/callback"
process.env.REDIRECT_URI = "http://localhost:" + process.env.PORT + process.env.CALLBACK_PATH

// Require necessary files
var request = require('request')
var express = require('express')
var Client = require("./client.js")

// Handle the callback to the routes
function handleCallback(req, res, next) {
  // Log everything
  console.log("\n-----BEGIN CALLBACK REQUEST-----")
  console.log("\nHeaders\n===========")
  console.log(req.headers)
  console.log("\nBody\n===========")
  console.log(req.body)
  console.log("\nToken\n===========")
  console.log(req.query.code)
  console.log("\n-----END CALLBACK REQUEST-----\n")

  // Send a callback successfull
  res.send("Callback successful")

  next()
}

// Get the token from the oauth server
function getToken(req, res, next) {
  var code = req.query.code
  request.post(client.tokenURI, {form: {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: client.redirectURI,
    client_id: client.clientID,
    client_secret: client.clientSecret
  }}, function(err, res, body) {
    console.log("\n-----BEGIN TOKEN RESPONSE-----")
    console.log("\nError\n===========\n" + err)
    console.log("\nHeaders\n===========")
    console.log(req.headers)
    console.log("\nBody\n===========")
    console.log(body)
    console.log("\n-----END TOKEN RESPONSE-----")

    next()
  })
}

// Start the server to list to the redirect
var app = express()
app.get(process.env.CALLBACK_PATH, handleCallback, getToken, function(req, res) {
  process.exit()
})
app.listen(process.env.PORT)

// Create the client
var client = Client.createOrLoad("./client.json")

// Display the authorization url
console.log("Authorization URL: " + client.authorizationURI + "?response_type=code&client_id=" + client.clientID + "&redirect_uri=" + client.redirectURI)

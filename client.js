var fs = require('fs')
var prompt = require('sync-prompt').prompt

var Client = function(clientID, clientSecret, redirectURI, authorizationURI, tokenURI) {
  this.clientID = clientID
  this.clientSecret = clientSecret
  this.redirectURI = redirectURI
  this.authorizationURI = authorizationURI
  this.tokenURI = tokenURI
}

// Create a client in the terminal or load one if one has already been created
Client.createOrLoad = function(filepath) {
  if (!fs.existsSync(filepath)) {
    Client.createJSONFile(filepath)
  }
  return Client.loadFromJSONFile(filepath)
}

// Create the json spec for the client at the given filepath
Client.createJSONFile = function(filepath) {
  fs.writeFileSync(filepath, JSON.stringify({
    client_id: prompt('Client ID: '),
    client_secret: prompt('Client Secret: '),
    redirect_uri: process.env.REDIRECT_URI,
    authorization_uri: prompt('Authorization URI: '),
    token_uri: prompt('Token URI: ')
  }))
}

// Loads a client from the given JSON file
Client.loadFromJSONFile = function(filepath) {
  var props = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))
  return new Client(props.client_id, props.client_secret, props.redirect_uri, props.authorization_uri, props.token_uri)
}

module.exports = Client

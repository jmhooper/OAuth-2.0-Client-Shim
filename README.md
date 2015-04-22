# OAuth 2 Client Shim

This project functions as a stand-in client for local apps that use OAuth 2.0.

## Getting Started

1. Clone the repo
2. Install the dependencies `npm install`
3. Run with `node index.js`

## How it works

When you first run the project, it will ask you to enter information about the client.
This info will be saved in `client.json`.
You can edit it there later or delete `client.json` to start over with a new client.

After the client is setup, an authorization url will be generated.
Upon entering the authorization url into your browser the OAuth 2.0 data flow will be logged in the console.

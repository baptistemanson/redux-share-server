# redux-share-server
Share redux state across the network between multiple clients and server!

The system is currently provided with an express middleware for the server side implementation, while the client is agnostic.

This package is experimental and API will change.

The client is available [here](https://github.com/baptistemanson/redux-share-client)
## Server

Here is the code to integrate the server side with express:


```javascript
//server.js

//start the socket server
var SyncReduxServer = require('redux-share-server')
var syncReduxServer = new SyncReduxServer(store,server);

//bind redux server and express
app.use('/redux',syncReduxServer.getMiddleware());

```

## Example of a reducer server side

```javascript
//will replicate on the server-side the client-side state.
function reducer(state = {} , action) { 
	if(action.type === "@@SYNC-CONNECT-SERVER-END") return action.state;
}


# API Endpoints (server)

* /redux/state: GET the state.
* /redux/action: POST an action.

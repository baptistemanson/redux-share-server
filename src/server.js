var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 2000;


import { createStore,applyMiddleware } from 'redux'
import {reducer, actions} from './actions.js'

var store = createStore(reducer);

app.use(function (req, res) {
  res.send({ msg: "hello man" });
});

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log(message);
    let action = JSON.parse(message);
    store.dispatch(action);
    console.log(store.getState());
  });

});


server.on('request', app);

server.listen(port, function () { console.log('Listening on ' + server.address().port) });

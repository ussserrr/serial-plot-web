/*
 *  Serial port section
 */
const SerialPort = require('serialport');
const serialPort = new SerialPort(
  '/dev/cu.wchusbserial14220',
  { baudRate: 115200 },
  function (err) {
    if (err)
      return console.log('Serial:', err.message);
  }
);

serialPort.on('open', function() {
  if (serialPort.isOpen)
    console.log("Serial port is open");
});

// react only on every 8 bytes
const SerialPortParserByteLength = require('@serialport/parser-byte-length');
const serialPortParser = serialPort.pipe(new SerialPortParserByteLength({
  length: 8
}));

// read every new chunk of data and store it in a global variable
var hexStr;
serialPortParser.on("data", function(data) {
  hexStr = data.toString('hex');
});



/*
 *  HTTP server section
 */
const express = require('express');
const expressApp = express();
const httpPort = 3000;

expressApp.use(express.static('.'));  // project' root as routing endpoint

expressApp.listen(httpPort, () => {
  console.log("Express app listening on port " + httpPort);
});



/*
 *  WebSocket server section
 */
const WebSocket = require('ws');
const webSocketPort = 1200;
const webSocketServer = new WebSocket.Server({
  port: webSocketPort
});

webSocketServer.on('connection', function(ws) {
  console.log("WebSocket is open on server port " + webSocketPort);

  // 'ws' is an internal WebSocket instance of WebSocket.Server.
  // Send current data on any request from client
  ws.on('message', function incoming(message) {
    ws.send(hexStr);
  });
});

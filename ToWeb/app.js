// GUIDES
// https://www.youtube.com/watch?v=gQYsUjT-IBo&t=1s
// https://serialport.io/docs/guide-usage
// https://serialport.io/docs/api-parser-readline
// https://socket.io/get-started/chat#integrating-socketio

// HTTP SERVER WITH EXPRESS AND SOCKET.IO
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// SERIAL CONNECTION
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM4', baudRate: 9600 })
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("Node is listening to port");
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

parser.on('data', function(data){
    console.log("Received data from arduino: " + data);
    io.emit("data", data);
})
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('server disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log(message);
        io.emit('newMessage', {
            from: message.to,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('Starting server');
});
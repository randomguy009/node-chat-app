const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message) => {
        console.log(message);

        io.emit('newMessage', generateMessage(message.to, message.text));

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.texr,
        //     createdAt: new Date().getTime()
        // });
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('Starting server');
});
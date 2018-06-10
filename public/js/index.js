var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.on('createEmail', (email) => {
        console.log(email);

    socket.emit('something', {
        to: 'tera baap chutiya',
        timestamp: 123645
    });
    });
});

socket.on('disconnect', () => {
    console.log('server disconnected');
});
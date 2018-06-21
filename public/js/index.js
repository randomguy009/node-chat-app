var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.on('newMessage', (message) => {
        console.log(message);
        var ul = jQuery('<ul></ul>');
        ul.text(`${message.from}: ${message.text}`);

        jQuery('#messages').append(ul);
    });
});

// socket.emit('createMessage', {
//     from: 'Eshwar',
//     text: 'Hello'
// }, () => {
//     console.log('Gotcha');
// });

socket.on('disconnect', () => {
    console.log('server disconnected');
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, () => {});
});
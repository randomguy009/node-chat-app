var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.on('newMessage', (message) => {
        console.log(message);
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        jQuery('#messages').append(li);
    });
});

// socket.emit('createMessage', {
//     from: 'Eshwar',
//     text: 'Hello'
// }, () => {
//     console.log('Gotcha');
// });

socket.on('newLocationMessage', (message) => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')

    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})

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

var locationButton = jQuery('#send-location');
locationButton.on('click', (e) => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported on your browser'); 
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location');
    });
});
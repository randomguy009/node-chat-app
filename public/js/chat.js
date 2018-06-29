var socket = io();

function scrollBottom() {

    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, (error) => {
        if (error) {
            alert(error);
            window.location.href ='/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('connect', () => {
    console.log('connected to server');

    socket.on('newMessage', (message) => {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            from: message.from,
            createdAt: formattedTime,
            text: message.text
        });
        jQuery('#messages').append(html);

        scrollBottom();
        
        // var li = jQuery('<li></li>');
        // li.text(`${message.from} ${formattedTime}: ${message.text}`);

        // jQuery('#messages').append(li);
    });
});

// socket.emit('createMessage', {
//     from: 'Eshwar',
//     text: 'Hello'
// }, () => {
//     console.log('Gotcha');
// });

socket.on('newLocationMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    jQuery('#messages').append(html);

    scrollBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>')

    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

socket.on('disconnect', () => {
    console.log('server disconnected');
});

socket.on('updateUserList', (users) => {
    var ol = jQuery('<ol></ol>');

    users.forEach((user) => {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
})

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text:  messageTextBox.val()
    }, () => {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', (e) => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported on your browser'); 
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Sending Location...');;
    });
});
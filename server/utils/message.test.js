var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
            var from = 'someone';
            var text = 'something';
            var message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'some';
        var lat = 931903;
        var lon = 391838;
        var locationmessage = generateLocationMessage(from, lat, lon);

        expect(locationmessage).toMatchObject({
            from,
            url :`https://www.google.com/maps?q=${lat},${lon}`
        });
        expect(typeof locationmessage.createdAt).toBe('number');
    });
});
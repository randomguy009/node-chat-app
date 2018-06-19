var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var message = {
            from: 'someone',
            text: 'something',
            createdAt: new Date().getTime()
        };

        expect(message.from)
    })
})
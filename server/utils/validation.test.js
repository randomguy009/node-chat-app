const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {

    it('Should reject non-string values', () => {
        expect(isRealString(1245)).toBe(false);
        expect(isRealString('   ')).toBe(false);
        expect(isRealString('abc123')).toBe(true);
    });
});
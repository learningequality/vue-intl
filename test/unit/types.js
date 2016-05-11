import expect from 'expect';
import {dateTimeFormatPropTypes} from '../../src/types';

describe("validator function", () => {
    it("should only accept one of ['narrow', 'short', 'long'] for a weekday format option", () => {
        expect(dateTimeFormatPropTypes.weekday.validator('narrow')).toBe(true);
        expect(dateTimeFormatPropTypes.weekday.validator('short')).toBe(true);
        expect(dateTimeFormatPropTypes.weekday.validator('long')).toBe(true);
        expect(dateTimeFormatPropTypes.weekday.validator('wide')).toBe(false);
    });
});

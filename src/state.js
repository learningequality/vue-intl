import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import IntlPluralFormat from './plural';
import memoizeIntlConstructor from 'intl-format-cache';

const state = {
    getDateTimeFormat: memoizeIntlConstructor(Intl.DateTimeFormat),
    getNumberFormat  : memoizeIntlConstructor(Intl.NumberFormat),
    getMessageFormat : memoizeIntlConstructor(IntlMessageFormat),
    getRelativeFormat: memoizeIntlConstructor(IntlRelativeFormat),
    getPluralFormat  : memoizeIntlConstructor(IntlPluralFormat),
    now: Date.now()
};

export default state;

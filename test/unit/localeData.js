/*
 * This file is a modified version of that used in the react-intl package.
 * https://github.com/yahoo/react-intl
 * The license notice below is provided to comply with the terms of the BSD license of that package.
 */

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   * Neither the name of the Yahoo Inc. nor the
 *     names of its contributors may be used to endorse or promote products
 *     derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL YAHOO! INC. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import * as localeData from '../../src/localeData';
import expect, {createSpy, spyOn} from 'expect';

import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

describe("localeData module", () => {
    let VueSpy;
    const IMF_LOCALE_DATA = Object.assign({}, IntlMessageFormat.__localeData__);
    const IRF_LOCALE_DATA = Object.assign({}, IntlRelativeFormat.__localeData__);

    const emptyLocaleData = () => {
        const emptyObject = (obj) => {
            Object.keys(obj).forEach((prop) => delete obj[prop]);
        };

        emptyObject(IntlMessageFormat.__localeData__);
        emptyObject(IntlRelativeFormat.__localeData__);
    };

    const restoreLocaleData = () => {
        emptyLocaleData();
        Object.assign(IntlMessageFormat.__localeData__, IMF_LOCALE_DATA);
        Object.assign(IntlRelativeFormat.__localeData__, IRF_LOCALE_DATA);
    };
    beforeEach(() => {
        VueSpy = class {
            constructor() {
                this.test = 'test';
            }
        };
    });
    afterEach(() => {
        VueSpy = undefined;
    });
    describe("addLocaleData", () => {
        beforeEach(() => {
            emptyLocaleData();
        });

        afterEach(() => {
            restoreLocaleData();
        });
        it("is a function", () => {
            expect(localeData.addLocaleData).toBeA('function');
        });
        it('does not throw when called with no arguments', () => {
            expect(() => localeData.addLocaleData()).toNotThrow();
        });

        it('adds locale data to the registry', () => {
            expect(localeData.hasLocaleData('testlang')).toBe(false);

            localeData.addLocaleData({locale: 'testlang'});
            expect(localeData.hasLocaleData('testlang')).toBe(true);
        });

        it('accepts an array of locale data', () => {

            const locale = 'test';
            expect(localeData.hasLocaleData(locale)).toBe(false);

            localeData.addLocaleData([{locale: 'test'}, {locale: 'notest'}]);
            expect(localeData.hasLocaleData(locale)).toBe(true);
        });
    });
    describe('hasLocaleData()', () => {
        beforeEach(() => {
            emptyLocaleData();
            // "en" is guaranteed to be included by default.
            IntlMessageFormat.__addLocaleData(IMF_LOCALE_DATA.en);
            IntlRelativeFormat.__addLocaleData(IRF_LOCALE_DATA.en);
        });

        it('does not throw when called with no arguments', () => {
            expect(() => localeData.hasLocaleData()).toNotThrow();
        });

        it('returns `false` when called with no arguments', () => {
            expect(localeData.hasLocaleData()).toBe(false);
        });

        it('returns `true` for built-in "en" locale', () => {
            expect(localeData.hasLocaleData('en')).toBe(true);
        });

        it('normalizes the passed-in locale', () => {
            expect(localeData.hasLocaleData('EN')).toBe(true);
            expect(localeData.hasLocaleData('eN')).toBe(true);
            expect(localeData.hasLocaleData('En')).toBe(true);
        });

        it('delegates to IntlMessageFormat and IntlRelativeFormat', () => {
            emptyLocaleData();
            expect(localeData.hasLocaleData('en')).toBe(false);

            IntlMessageFormat.__addLocaleData(IMF_LOCALE_DATA.en);
            IntlRelativeFormat.__addLocaleData(IRF_LOCALE_DATA.en);
            expect(localeData.hasLocaleData('en')).toBe(true);
        });

        it('requires both IntlMessageFormat and IntlRelativeFormat to have locale data', () => {
            emptyLocaleData();
            IntlMessageFormat.__addLocaleData(IMF_LOCALE_DATA.en);
            expect(localeData.hasLocaleData('en')).toBe(false);
        });
    });
    describe("registerMessages", () => {
        it("is a function", () => {
            expect(localeData.registerMessages).toBeA('function');
        });
        it("sets an allMessages object when undefined", () => {
            expect(VueSpy.__allMessages).toNotExist();
            localeData.registerMessages(VueSpy, "test-language", {test: "should be here"});
            expect(VueSpy.__allMessages).toExist();
        });
        it("sets an allMessages for locale to messages arg when undefined", () => {
            VueSpy.__allMessages = {};
            expect(VueSpy.__allMessages['test-language']).toNotExist();
            localeData.registerMessages(VueSpy, "test-language", {test: "should be here"});
            expect(VueSpy.__allMessages['test-language']).toEqual({test: "should be here"});
        });
        it("merges an allMessages for locale with messages arg when defined", () => {
            VueSpy.__allMessages = {};
            VueSpy.__allMessages['test-language'] = {notest: 'here', test: 'not here'};
            localeData.registerMessages(VueSpy, "test-language", {test: "should be here"});
            expect(VueSpy.__allMessages['test-language']).toEqual({notest: 'here', test: "should be here"});
        });
    });
    describe("registerFormats", () => {
        it("is a function", () => {
            expect(localeData.registerFormats).toBeA('function');
        });
        it("sets an allFormats object when undefined", () => {
            expect(VueSpy.__allFormats).toNotExist();
            localeData.registerFormats(VueSpy, "test-language", {test: "should be here"});
            expect(VueSpy.__allFormats).toExist();
        });
        it("sets an allFormats for locale to formats arg when undefined", () => {
            VueSpy.__allFormats = {};
            expect(VueSpy.__allFormats['test-language']).toNotExist();
            localeData.registerFormats(VueSpy, "test-language", {test: "should be here"});
            expect(VueSpy.__allFormats['test-language']).toEqual({test: "should be here"});
        });
        it("merges an allFormats for locale with formats arg when defined", () => {
            VueSpy.__allFormats = {};
            VueSpy.__allFormats['test-language'] = {notest: 'here', test: 'not here'};
            localeData.registerFormats(VueSpy, "test-language", {test: "should be here"});
            expect(VueSpy.__allFormats['test-language']).toEqual({notest: 'here', test: "should be here"});
        });
    });
});
import expect, {createSpy, spyOn} from 'expect';
import VueIntl from '../../src/vue-intl';
import * as formatMethods from '../../src/format';

describe("VueIntl API", () => {
    let VueSpy;
    beforeEach(() => {
        VueSpy = class {
            constructor () {
                this.test = 'test';
            }
        };
        VueIntl.install(VueSpy);
    });
    afterEach(() => {
        VueSpy = undefined;
    });
    describe("addLocaleData", () => {
        it("is present", () => {
            expect(VueSpy.addLocaleData).toExist();
        });
    });
    describe("registerMessages", () => {
        it("is present", () => {
            expect(VueSpy.registerMessages).toExist();
        });
        it("modifies the global Vue instance", () => {
            VueSpy.registerMessages("test-language", {test: "should be here"});
            expect(VueSpy.__allMessages["test-language"].test).toEqual("should be here", `registerMessages did not
            modify the bound Vue instance`);
        });
    });
    describe("registerFormats", () => {
        it("is present", () => {
            expect(VueSpy.registerFormats).toExist();
        });
        it("modifies the global Vue instance", () => {
            VueSpy.registerFormats("test-language", {test: "should be here"});
            expect(VueSpy.__allFormats["test-language"].test).toEqual("should be here", `registerFormats did not
            modify the bound Vue instance`);
        });
    });
    describe("setLocale", () => {
        beforeEach(() => {
            const setSpy = createSpy();
            VueSpy.set = setSpy;
        });
        afterEach(() => {
            VueSpy.set.restore();
            delete VueSpy.set;
        });
        it("is present", () => {
            expect(VueSpy.setLocale).toExist();
        });
        it("calls set on the global Vue instance", () => {
            VueSpy.setLocale("test-language");
            expect(VueSpy.set).toHaveBeenCalledWith('locale', 'test-language');
        });
    });
    describe("__format_state", () => {
        it("is present", () => {
            expect(VueSpy.__format_state).toExist();
        });
    });
    describe("__format_config", () => {
        it("is present", () => {
            expect(VueSpy.__format_config).toExist();
        });
    });
    describe("prototype methods", () => {
        const methods = Object.getOwnPropertyNames(formatMethods).filter((name) => {
            return formatMethods[name] instanceof Function;
        });
        methods.forEach((test) => {
            describe(test, () => {
                it(`${test} is present`, () => {
                    expect(VueSpy.prototype[`\$${test}`]).toExist();
                });
                it(`${test} is invoked with local config state`, () => {
                    let methodSpy = spyOn(formatMethods, test);
                    const lang = 'test-language';
                    let getSpy = createSpy().andReturn(lang);
                    VueSpy.$get = getSpy;
                    const config = {
                        format: {test: "test"},
                        messages: {hello: "hello"},
                        defaultLocale: lang,
                        defaultFormats: {untest: "untest"}
                    };
                    const state = {};
                    VueSpy.__format_config = config;
                    VueSpy.__format_state = state;
                    const vue = new VueSpy();
                    vue[`\$${test}`]();
                    expect(getSpy).toHaveBeenCalledWith('locale');
                    expect(methodSpy).toHaveBeenCalledWith(Object.assign({locale: lang}, config), state);
                });
            });

        });
    });
    describe("prototype.$formatTime", () => {
        it("is present", () => {
            expect(VueSpy.prototype.$formatTime).toExist();
        });
    });
    describe("prototype.$formatRelative", () => {
        it("is present", () => {
            expect(VueSpy.prototype.$formatRelative).toExist();
        });
    });
    describe("prototype.$formatNumber", () => {
        it("is present", () => {
            expect(VueSpy.prototype.$formatNumber).toExist();
        });
    });
    describe("prototype.$formatPlural", () => {
        it("is present", () => {
            expect(VueSpy.prototype.$formatPlural).toExist();
        });
    });
    describe("prototype.$formatMessage", () => {
        it("is present", () => {
            expect(VueSpy.prototype.$formatMessage).toExist();
        });
    });
    describe("prototype.$formatHTMLMessage", () => {
        it("is present", () => {
            expect(VueSpy.prototype.$formatHTMLMessage).toExist();
        });
    });
});
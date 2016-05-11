import setLocale from '../../src/setLocale';
import expect, {createSpy, spyOn} from 'expect';

describe("setLocale", () => {
    let VueSpy;
    beforeEach(() => {
        VueSpy = class {
            constructor() {
                this.test = 'test';
            }
        };
        VueSpy.$set = createSpy();
        VueSpy.__format_config = {};
    });
    afterEach(() => {
        VueSpy.$set.restore();
        delete VueSpy.$set;
        VueSpy = undefined;
    });
    it("calls set on the passed in Vue constructor", () => {
        setLocale(VueSpy, "test-language");
        expect(VueSpy.$set).toHaveBeenCalledWith('locale', 'test-language');
    });
    it("sets format config to locale format if available", () => {
        const lang = "test-language";
        const formats = {test: 'test'};
        VueSpy.__allFormats = {};
        VueSpy.__allFormats[lang] = formats;
        setLocale(VueSpy, lang);
        expect(VueSpy.__format_config.formats).toEqual(formats);
    });
    it("sets format config to default format if locale format is unavailable", () => {
        const lang = "test-language";
        const formats = {test: 'test'};
        VueSpy.__format_config.defaultFormats = formats;
        setLocale(VueSpy, lang);
        expect(VueSpy.__format_config.formats).toEqual(formats);
    });
    it("sets messages config to locale messages if available", () => {
        const lang = "test-language";
        const messages = {test: 'test'};
        VueSpy.__allMessages = {};
        VueSpy.__allMessages[lang] = messages;
        setLocale(VueSpy, lang);
        expect(VueSpy.__format_config.messages).toEqual(messages);
    });
    it("sets messages config to empty object if locale messages are unavailable", () => {
        const lang = "test-language";
        setLocale(VueSpy, lang);
        expect(VueSpy.__format_config.messages).toEqual({});
    });
});
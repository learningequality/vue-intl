import {addLocaleData, registerMessages, registerFormats} from './localeData';
import setLocale from './setLocale';
import state from './state';
import {
    formatDate,
    formatTime,
    formatRelative,
    formatNumber,
    formatPlural,
    formatMessage,
    formatHTMLMessage
} from './format';

const formatMethods = {
    formatDate,
    formatTime,
    formatRelative,
    formatNumber,
    formatPlural,
    formatMessage,
    formatHTMLMessage
};

var VueIntlPlugin = {};

VueIntlPlugin.install = function (Vue, options) {
    Vue.addLocaleData = addLocaleData;
    Vue.registerMessages = registerMessages.bind(null, Vue);
    Vue.registerFormats = registerFormats.bind(null, Vue);
    Vue.setLocale = setLocale.bind(null, Vue);
    Vue.__format_state = state;
    Vue.__format_config = {
        formats: options.defaultFormats || {},
        messages: {},
        defaultLocale: options.defaultLocale || 'en',
        defaultFormats: options.defaultFormats || {}
    };

    for (let key of formatMethods) {
        Vue.prototype['\$${key}'] = function(...args) {
            let config = {locale: Vue.$get('locale')};
            config.assign(Vue.__format_config);
            const state = Vue.__format_state;
            return formatMethods[key](config, state, ...args);
        }
    }
};

module.exports = VueIntlPlugin;

import {addLocaleData, registerMessages, registerFormats} from './localeData';
import setLocale from './setLocale';
import state from './state';
import * as formatMethods from './format';

const VueIntlPlugin = {
    install(Vue, options={}) {
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

        for (let key of Object.getOwnPropertyNames(formatMethods).filter((name) => {
            return formatMethods[name] instanceof Function;
        })) {
            Vue.prototype[`\$${key}`] = function(...args) {
                let config = {locale: Vue.$get('locale')};
                Object.assign(config, Vue.__format_config);
                const state = Vue.__format_state;
                return formatMethods[key](config, state, ...args);
            }
        }
    }
};

export default VueIntlPlugin;

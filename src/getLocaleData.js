export default function getLocaleData(Vue) {
    const locale = Vue.locale;
    const format_data = Object.getOwnPropertyNames((Vue.__allFormats || {})[locale] || {}).length > 0;
    const formats = format_data ? Vue.__allFormats[locale] : Vue.__format_config.defaultFormats;
    const messages = (Vue.__allMessages || {})[locale] || {};
    return {
        formats,
        messages,
        defaultLocale: Vue.__format_config.defaultLocale,
        defaultFormats: Vue.__format_config.defaultFormats
    };
}

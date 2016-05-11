export default function setLocale(Vue, locale) {
    Vue.$set('locale', locale);
    const format_data = Object.getOwnPropertyNames((Vue.__allFormats || {})[locale] || {}).length > 0;
    Vue.__format_config.formats = format_data ? Vue.__allFormats[locale] : Vue.__format_config.defaultFormats;
    Vue.__format_config.messages = (Vue.__allMessages || {})[locale] || {};
}

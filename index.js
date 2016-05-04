var VueIntlPlugin = {};

VueIntlPlugin.install = function (Vue, options) {
  Vue.prototype.$t = function(text) {
      return text;
  }
};

module.exports = VueIntlPlugin;

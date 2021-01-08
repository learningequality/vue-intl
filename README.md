# vue-intl
This repository has been archived, in favour of [FormatJS](https://github.com/formatjs/formatjs) which now hosts the vue-intl plugin.

Vue Plugin for FormatJS Internalization and Localization


### Install

``` bash
npm install vue-intl
```

### Usage

``` js
// assuming CommonJS
var Vue = require('vue');
var VueIntl = require('vue-intl');

// use globally
Vue.use(VueIntl);
```

*N.B.* The underlying suite, FormatJS, that the VueIntl plugin relies on, requires either a browser that supports the
[Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), or has the [Intl Polyfill](https://github.com/andyearnshaw/Intl.js/)
available. As such, it is necessary for cross browser support to load the Intl polyfill (or preferably to load it if needed).

See the [FormatJS Documentation](http://formatjs.io/guides/runtime-environments/) for more details.

### Global API Methods

#### setLocale

Set the current locale for the page.

``` js
Vue.setLocale('fr');
```

Alternatively, use a more specific locale code.

``` js
Vue.setLocale('en-GB');
```

#### registerMessages

Set an object containing messages for a particular locale.

``` js
Vue.registerMessages('fr', {
    example_message_id: "La plume de ma tante est sur le bureau de mon oncle."
});
```

This message will now be available when the locale is set to 'fr'.

#### registerFormats

Create custom formats, see [FormatJS main documentation for details](http://formatjs.io/guides/message-syntax/#custom-formats).

``` js
Vue.registerFormats('fr', {
    number: {
        eur: { style: 'currency', currency: 'EUR' }
    }
});
```

This format will now be available when the locale is set to 'fr'.

### Instance Methods

These methods are for actually performing localization and translation within the context of a Vue component.

The methods are set on the Vue instance prototype, so are available locally, with access to local variables.

#### $formatDate

This will format dates to the locale appropriate format.


```html
<p v-html="$formatDate(now)"></p>
```

Where `now` is a Javascript Date object or a `Date` coercable `Number` or `String`.

Will output the following

```html
<p>11-05-2016</p>
```

(if the locale is set to 'fr').

The method can also accept a second argument of an options object - the options follow the [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).

```html
<p v-html="$formatDate(now, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })"></p>
```

Will output the following

```html
<p>Mittwoch, 11. Mai 2016</p>
```

(if the locale is set to 'de-DE').

Additionally, the method accepts an optional `format` argument that provides some commonly used date formats.
These are described in the [FormatJS main documentation](http://formatjs.io/guides/message-syntax/#date-type).

#### $formatTime

This will format times to the locale appropriate format.


```html
<p v-html="$formatTime(now, {format: 'short'})"></p>
```

These formats are described in the [FormatJS main documentation](http://formatjs.io/guides/message-syntax/#time-type).

Where `now` is a Javascript Date object or a `Date` coercable `Number` or `String`.

Will output the following

```html
<p>19 h 00</p>
```

(if the locale is set to 'fr').

The other options follow the [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).

#### $formatRelative

This will render date-times relative to page load time or to an inserted `now` option to the locale appropriate format.


```html
<p v-html="$formatRelative(two_days_ago)"></p>
```

These formats are described in the [FormatJS main documentation](http://formatjs.io/guides/message-syntax/#time-type).

Will output the following

```html
<p>2 days ago</p>
```

(if the locale is set to 'en-US').

The other options follow the [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).

#### $formatNumber

This will set numbers to the locale appropriate format.


```html
<p v-html="$formatNumber(number_of_things)"></p>
```

These formats are described in the [FormatJS main documentation](http://formatjs.io/guides/message-syntax/#number-type).

Will output the following

```html
<p>17</p>
```

(if the locale is set to 'en-US').

```html
<p v-html="$formatNumber(pct_of_things, {style: 'percent'})"></p>
```

Will output the following

```html
<p>12%</p>
```

(if the locale is set to 'en-US').

The other options follow the [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

#### $formatPlural

This will format according to plural rules for the locale appropriate format.


```html
<p v-html="$formatPlural(number_of_things, {style: 'cardinal')"></p>
```

These formats are described in the [FormatJS main documentation](http://formatjs.io/guides/message-syntax/#plural-format).

Will output the following

```html
<p>17</p>
```

(if the locale is set to 'fr-FR').

```html
<p v-html="$formatPlural(number_of_things, {style: 'ordinal')"></p>
```

These formats are described in the [FormatJS main documentation](http://formatjs.io/guides/message-syntax/#ordinal-format).

Will output the following

```html
<p>17eme</p>
```

(if the locale is set to 'fr-FR').


#### $formatMessage

This will translate messages according to the locale appropriate format, it will also apply any pluralization rules
in the message.

Messages are specified using ICU message syntax.


```html
<p v-html="$formatMessage({id: 'example_message_id', defaultMessage: 'It\'s my cat\'s {year, selectordinal,
    one {#st}
    two {#nd}
    few {#rd}
    other {#th}
} birthday!'}, {year: year})"></p>
```

These formats are described in the [FormatJS main documentation](http://formatjs.io/guides/message-syntax/).

Will output the following

```html
<p>It's my cat's 7th birthday!</p>
```

(if the locale is set to 'en').

#### $formatHTMLMessage


Identical to $formatMessage, except that it will escape HTML specific strings to render HTML directly in the message.



#### Loading additional locale data

By default, only the en specific locale data is included in vue-intl. In order to load locale data for other locales, for example for proper pluralization, ordinals, and relative time formatting, you must load the relevant locale data. Ideally, you would do this dynamically, depending on the locale that is currently in use (as all locale data for all locales is in excess of 1MB).

To use a specific locale, load the data from the relevant file:
```js
import esLocaleData from 'vue-intl/locale-data/es';
import { addLocaleData } from 'vue-intl';

addLocaleData(esLocaleData);
```

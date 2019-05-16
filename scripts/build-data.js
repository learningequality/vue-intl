/*
 * This software is distributed under an MIT license, see accompanying LICENSE file for details.
 */

/*
 * Many files in this package are modified versions of those used in the react-intl package.
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

import * as fs from 'fs';
import * as p from 'path';
import {sync as mkdirpSync} from 'mkdirp';
import extractCLDRData from 'formatjs-extract-cldr-data';
import serialize from 'serialize-javascript';
import {rollup} from 'rollup';
import memory from 'rollup-plugin-memory';
import uglify from 'rollup-plugin-uglify';

const DEFAULT_LOCALE = 'en';

const cldrData = extractCLDRData({
  pluralRules: true,
  relativeFields: true,
});

const cldrDataByLocale = new Map(
  Object.keys(cldrData).map(locale => [locale, cldrData[locale]])
);

const cldrDataByLang = [...cldrDataByLocale].reduce((map, [locale, data]) => {
  const [lang] = locale.split('-');
  const langData = map.get(lang) || [];
  return map.set(lang, langData.concat(data));
}, new Map());

function createDataModule(localeData) {
  return `// GENERATED FILE
export default ${serialize(localeData)};
`;
}

function writeUMDFile(filename, module) {
  const lang = p.basename(filename, '.js');

  return rollup({
    input: filename,
    plugins: [
      memory({
        path: filename,
        contents: module,
      }),
      uglify(),
    ],
  })
    .then(bundle => {
      return bundle.write({
        file: filename,
        format: 'umd',
        name: `VueIntlLocaleData.${lang}`,
      });
    })
    .then(() => filename);
}

function writeFile(filename, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, contents, err => {
      if (err) {
        reject(err);
      } else {
        resolve(p.resolve(filename));
      }
    });
  });
}

// -----------------------------------------------------------------------------

mkdirpSync('locale-data/');

const defaultData = createDataModule(cldrDataByLocale.get(DEFAULT_LOCALE));
writeFile(`src/${DEFAULT_LOCALE}.js`, defaultData);

const allData = createDataModule([...cldrDataByLocale.values()]);
writeUMDFile('locale-data/index.js', allData);

cldrDataByLang.forEach((cldrData, lang) => {
  writeUMDFile(`locale-data/${lang}.js`, createDataModule(cldrData));
});

process.on('unhandledRejection', reason => {
  throw reason;
});
console.log('> Writing locale data files...');

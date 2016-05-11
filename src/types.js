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

const bool = { type : Boolean },
    number = { type : Number },
    string = { type : String },
    object = { type : Object },
    oneOf = function(array) {
        return {validator: function(value) {
            return array.indexOf(value) > -1;
        }};
    };

export const intlConfigPropTypes = {
    locale  : string,
    formats : object,
    messages: object,

    defaultLocale : string,
    defaultFormats: object
};

export const dateTimeFormatPropTypes = {
    localeMatcher: oneOf(['best fit', 'lookup']),
    formatMatcher: oneOf(['basic', 'best fit']),

    timeZone: string,
    hour12  : bool,

    weekday     : oneOf(['narrow', 'short', 'long']),
    era         : oneOf(['narrow', 'short', 'long']),
    year        : oneOf(['numeric', '2-digit']),
    month       : oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    day         : oneOf(['numeric', '2-digit']),
    hour        : oneOf(['numeric', '2-digit']),
    minute      : oneOf(['numeric', '2-digit']),
    second      : oneOf(['numeric', '2-digit']),
    timeZoneName: oneOf(['short', 'long'])
};

export const numberFormatPropTypes = {
    localeMatcher: oneOf(['best fit', 'lookup']),

    style          : oneOf(['decimal', 'currency', 'percent']),
    currency       : string,
    currencyDisplay: oneOf(['symbol', 'code', 'name']),
    useGrouping    : bool,

    minimumIntegerDigits    : number,
    minimumFractionDigits   : number,
    maximumFractionDigits   : number,
    minimumSignificantDigits: number,
    maximumSignificantDigits: number
};

export const relativeFormatPropTypes = {
    style: oneOf(['best fit', 'numeric']),
    units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year'])
};

export const pluralFormatPropTypes = {
    style: oneOf(['cardinal', 'ordinal'])
};

(function () {
    'use strict';

    angular
        .module('revaluate.common')
    .service('JWTHelper', function () {

        this.urlBase64Decode = function (str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0: {
                    break;
                }

                case 2: {
                    output += '==';
                    break;
                }

                case 3: {
                    output += '=';
                    break;
                }

                default: {
                    throw 'Illegal base64url string!';
                }
            }
            return window.atob(output);
        };

        this.decodeToken = function (token) {
            var parts = token.split('.');

            if (parts.length !== 3) {
                throw new Error('JWT must have 3 parts');
            }

            var decoded = this.urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error('Cannot decode the token');
            }

            return JSON.parse(decoded);
        };

        this.getTokenExpirationDate = function (token) {
            var decoded;
            decoded = this.decodeToken(token);

            if (!decoded.exp) {
                return null;
            }

            var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
            d.setUTCSeconds(decoded.exp);

            return d;
        };

        this.isTokenExpired = function (token) {
            var d = this.getTokenExpirationDate(token);

            if (!d) {
                return false;
            }

            // Token expired?
            /*jshint validthis: true */
            return !(d.valueOf() > new Date().valueOf());
        };
    });
}());

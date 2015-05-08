/**
 * Color service which encapsulates the whole logic related to color.
 */
angular
    .module("color")
    .service("ColorService", function (COLOR_URLS, $q, $http, CacheFactory) {

        if ( !CacheFactory.get('colorCache') ) {
            CacheFactory.createCache('colorCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var colorCache = CacheFactory.get('colorCache');

        /**
         * Get all colors
         * @returns {*}
         */
        this.getAllColors = function () {
            return $http
                .get(URLTo.api(COLOR_URLS.allColors), { cache: colorCache })
                .then(function (response) {

                    return response.data
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    });
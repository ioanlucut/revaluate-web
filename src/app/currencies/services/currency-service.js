/**
 * Currencies service which encapsulates the whole logic related to currencies.
 */
angular
    .module("currencies")
    .service("CurrencyService", function (CURRENCY_URLS, $q, $http) {

        /**
         * Get all currencies
         * @returns {*}
         */
        this.getAllCurrencies = function () {
            return $http
                .get(URLTo.api(CURRENCY_URLS.allCurrencies))
                .then(function (response) {

                    return response.data
                }).catch(function (response) {
                    return $q.reject(response);
                });
        };
    });
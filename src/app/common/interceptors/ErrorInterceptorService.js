(function () {
    'use strict';

    /**
     * Error service interceptor used to listen to ajax server responses.
     */
    angular
        .module('revaluate.common')
        .factory('ErrorInterceptor', function ($rootScope, $q, ERROR_INTERCEPTOR) {

            return {

                /**
                 * Response error interceptor.
                 *
                 * @param response
                 * @returns {*}
                 */
                responseError: function (response) {

                    var INTERNAL_SERVER_ERROR = 500;
                    var PAYMENT_REQUIRED = 402;

                    if (response.status === INTERNAL_SERVER_ERROR && !response.config.cache) {
                        $rootScope.$broadcast(ERROR_INTERCEPTOR.status500, response);
                    } else if (response.status === PAYMENT_REQUIRED && !response.config.cache) {
                        $rootScope.$broadcast(ERROR_INTERCEPTOR.status402, response);
                    }

                    return $q.reject(response);
                }
            };

        });
}());

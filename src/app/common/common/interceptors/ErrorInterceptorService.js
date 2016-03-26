/**
 * Error service interceptor used to listen to ajax server responses.
 */
function ErrorInterceptorService($rootScope, $q, ERROR_INTERCEPTOR) {
  'ngInject';

  return {

    /**
     * Response error interceptor.
     *
     * @param response
     * @returns {*}
     */
    responseError(response) {

      const INTERNAL_SERVER_ERROR = 500;
      const PAYMENT_REQUIRED = 402;

      if (response.status === INTERNAL_SERVER_ERROR && !response.config.cache) {
        $rootScope.$broadcast(ERROR_INTERCEPTOR.status500, response);
      } else if (response.status === PAYMENT_REQUIRED && !response.config.cache) {
        $rootScope.$broadcast(ERROR_INTERCEPTOR.status402, response);
      }

      return $q.reject(response);
    },
  };

}

export default ErrorInterceptorService;

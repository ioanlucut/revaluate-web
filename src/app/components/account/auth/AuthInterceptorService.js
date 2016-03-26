/**
 * Authentication service interceptor used to listen to server responses.
 */
function AuthInterceptorService($rootScope, $q, AUTH_EVENTS) {
  'ngInject';
  return {

    /**
     * Response error interceptor.
     */
    responseError(response) {
      if (response.status === 401) {
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
      }

      if (response.status === 403) {
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
      }

      if (response.status === 419 || response.status === 440) {
        $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
      }

      return $q.reject(response);
    },
  };
}

export default AuthInterceptorService;

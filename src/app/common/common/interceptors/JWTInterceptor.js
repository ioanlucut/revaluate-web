function JWTInterceptor() {

  this.authHeader = 'Authorization';
  this.authPrefix = 'Bearer ';

  const _this = this;

  /*@ngInject*/
  this.$get = ($q, $injector, $rootScope, SessionService) => ({
    request(request) {
      if (request.skipAuthorization) {
        return request;
      }

      request.headers = request.headers || {};

      // Already has an Authorization header
      if (request.headers[_this.authHeader]) {
        return request;
      }

      const tokenPromise = $q.when($injector.invoke(() => SessionService.getJwtToken(), this, {

        config: request,
      }));

      return tokenPromise.then(token => {
        if (token) {
          request.headers[_this.authHeader] = _this.authPrefix + token;
        }

        return request;
      });
    },
  });
}

export default JWTInterceptor;

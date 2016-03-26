import AuthFilterService from './AuthFilterService';
import AuthService from './AuthService';
import AuthInterceptorService from './AuthInterceptorService';
import authLastAttemptUrlValue from './authLastAttemptUrlValue';

export default angular
  .module('revaluate.account.auth', [])
  .service('AuthFilter', AuthFilterService)
  .service('AuthService', AuthService)
  .factory('AuthInterceptor', AuthInterceptorService)
  .value('redirectToUrlAfterLogin', authLastAttemptUrlValue);

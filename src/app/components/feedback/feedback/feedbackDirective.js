function feedbackDirective($rootScope, AuthService, AUTH_EVENTS, $timeout) {
  return {
    restrict: 'A',
    templateUrl: '/app/components/feedback/feedback/feedbackDirective.tpl.html',
    link(scope, el) {
      const TIMEOUT = 2000;

      scope.isUserAuthenticated = AuthService.isAuthenticated();

      /**
       * Listen to login success event. If user is properly logged in,
       * then make sure we show the logged in contact form.
       */
      scope.$on(AUTH_EVENTS.loginSuccess, () => {
        scope.isUserAuthenticated = true;
      });

      scope.$on(AUTH_EVENTS.logoutSuccess, () => {
        scope.isUserAuthenticated = false;
      });

      scope.$on('$viewContentLoaded', () => {
        if (!el.is(':visible')) {
          $timeout(() => {
            el.show();
          }, TIMEOUT);
        }
      });
    },
  };
}

export default feedbackDirective;

export default

/**
 * Abstract error page controller.
 */
  function ($scope, StatesHandler) {

    /**
     * Track event.
     */
    $scope.trackErrorEvent = function (event) {
    $scope.$broadcast('trackEvent', event);
  };

    /**
     * Continues to home page.
     */
    $scope.goToHomePage = function () {
    StatesHandler.goHome();
  };
  }


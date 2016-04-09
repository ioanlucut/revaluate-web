/**
 * Abstract error page controller.
 */
function AbstractErrorPageController($scope) {
  'ngInject';

  /**
   * Track event.
   */
  $scope.trackErrorEvent = event => {
    $scope.$broadcast('trackEvent', event);
  };
}

export default AbstractErrorPageController;

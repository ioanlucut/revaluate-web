function Error500PageController($scope, $controller, USER_ACTIVITY_EVENTS) {
  'ngInject';

  /**
   * Inherit from this controller
   */
  $controller('AbstractErrorPageController', { $scope });

  /**
   * Track error event
   */
  $scope.trackErrorEvent(USER_ACTIVITY_EVENTS.error500);
}

export default Error500PageController;

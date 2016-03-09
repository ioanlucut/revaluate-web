function Error404PageController($scope, $controller, USER_ACTIVITY_EVENTS) {

  /**
   * Inherit from this controller
   */
  $controller('AbstractErrorPageController', { $scope: $scope });

  /**
   * Track error event
   */
  $scope.trackErrorEvent(USER_ACTIVITY_EVENTS.error404);
}

export default Error404PageController;

function HeaderController($document, $scope, $rootScope, $state, $timeout, StatesHandler, AuthService, AUTH_EVENTS) {

  /**
   * Save state to scope
   */
  this.$state = $state;

  /**
   * Reference to the current user.
   */
  this.currentUser = $rootScope.currentUser;

  /**
   * Is user authenticated ?
   */
  this.isUserAuthenticated = AuthService.isAuthenticated();

  /**
   * Show app header
   */
  this.showAppHeader = this.isUserAuthenticated;

  /**
   * Handles tour page link
   */
  this.goToTourPage = function () {
    StatesHandler.goHome(function () {

      // Callback
      $timeout(function () {
        var duration = 1000,
          offset = 0,
          someElement = angular.element(document.getElementById('section__1'));

        $document
          .scrollToElement(someElement, offset, duration);
      });
    });
  };

  /**
   * We validate the show app header content after view is loaded.
   */
  $scope.$on('$viewContentLoaded', _.bind(function () {
    $timeout(_.bind(function () {
      this.showAppHeader = this.isUserAuthenticated;
    }, this));
  }, this));

  $scope.$on(AUTH_EVENTS.loginSuccess, _.bind(function () {
    this.isUserAuthenticated = true;
  }, this));

  $scope.$on(AUTH_EVENTS.logoutSuccess, _.bind(function () {
    this.isUserAuthenticated = false;
  }, this));

}

export default HeaderController;

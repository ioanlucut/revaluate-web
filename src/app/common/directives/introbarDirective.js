(function () {
  'use strict';

  angular
    .module('revaluate.common')
    .directive('introBarListener', function ($timeout) {
      return {
        restrict: 'A',
        controller: function ($scope, $rootScope, $state, $timeout, StatesHandler, AuthService, AUTH_EVENTS) {

          /**
           * Reference to the current user.
           */
          this.currentUser = $rootScope.currentUser;

          /**
           * Is user authenticated ?
           */
          this.isUserAuthenticated = AuthService.isAuthenticated();

          $scope.$on(AUTH_EVENTS.loginSuccess, _.bind(function () {
            this.isUserAuthenticated = true;
          }, this));

          $scope.$on(AUTH_EVENTS.logoutSuccess, _.bind(function () {
            this.isUserAuthenticated = false;
          }, this));

        },

        controllerAs: 'vm',
        link: function (scope, elem, attrs, ctrl) {

          scope.$on('$viewContentLoaded', function () {
            var ID_SELECTOR = '#ib-content',
              el = $(ID_SELECTOR);

            if (ctrl.isUserAuthenticated && el.is(':visible')) {
              $timeout(function () {
                el.hide();
              });
            }
          });

        },
      };
    });
}());

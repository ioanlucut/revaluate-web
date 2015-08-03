(function () {
    'use strict';

    angular
        .module('revaluate.common')
    .controller('HeaderController', function ($scope, $rootScope, $state, $timeout, StatesHandler, AuthService, AUTH_EVENTS) {

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

                $timeout(function () {
                    $rootScope
                        .$broadcast('fullpage-scroll-to', {
                            slideNumber: 2
                        })
                });

            })
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

    });
}());

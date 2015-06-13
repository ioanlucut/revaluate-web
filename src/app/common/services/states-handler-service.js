'use strict';

angular
    .module("revaluate.common")
    .service("StatesHandler", function ($state, $stateParams, STATES) {

        this.goHome = function () {
            this.go(STATES.home);
        };

        this.goToProfile = function () {
            this.go(STATES.profile);
        };

        this.goToSetUp = function () {
            this.go(STATES.setUp);
        };

        this.goToAddPayment = function () {
            this.go(STATES.addPayment);
        };

        this.goToLogin = function () {
            this.go(STATES.account);
        };

        this.goToResetPassword = function () {
            this.go(STATES.account);
        };

        this.go = function (state) {
            $state.go(state);
        };

        this.goToExpenses = function () {
            this.go(STATES.expenses);
        };

        this.refreshCurrentState = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
    });

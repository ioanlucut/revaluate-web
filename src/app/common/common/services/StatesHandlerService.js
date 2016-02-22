(function () {
  'use strict';

  angular
    .module('revaluate.common')
    .service('StatesHandler', function ($state, $stateParams, STATES) {

      function call(callback) {
        if (callback && typeof (callback) === 'function') {
          callback();
        }
      }

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

      this.goToExpenses = function (callback) {
        this.go(STATES.expenses);

        call(callback);
      };

      this.goHome = function (callback) {
        this.go(STATES.home);

        call(callback);
      };

      this.goToIntegrations = function () {
        this.go(STATES.integrations);
      };

      this.refreshCurrentState = function () {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true,
        });
      };
    });
}());

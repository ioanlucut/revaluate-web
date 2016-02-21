(function () {
  'use strict';

  /* Account modal */
  angular
    .module('revaluate.account')
    .service('AccountModal', function ($rootScope, $timeout, AUTH_MODAL) {

      // By default the modal is closed
      this.isOpen = false;
      this.state = null;

      // Open the modal
      this.open = function () {
        $timeout(_.bind(function () {
          this.isOpen = true;
        }, this));
      };

      // Close the modal
      this.close = function () {
        $timeout(_.bind(function () {
          this.isOpen = false;
        }, this));
      };

      // Set state
      this.setState = function (state) {
        $timeout(_.bind(function () {
          this.state = state;
        }, this));
      };

      // Open with state
      this.openWithState = function (state) {
        this.setState(state);
        this.open();
      };

      // Listen to the login event
      $rootScope.$on(AUTH_MODAL.close, _.bind(function () {
        this.close();
      }, this));
    });
}());

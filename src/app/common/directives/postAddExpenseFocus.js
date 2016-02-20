(function () {
  'use strict';

  angular
    .module('revaluate.common')
    .directive('postAddExpenseFocus', function ($timeout, EXPENSE_EVENTS) {
      return {
        restrict: 'A',
        link: function (scope, el) {

          function focus() {
            $timeout(function () {
              el.focus();
            });
          }

          scope
            .$on(EXPENSE_EVENTS.isCreated, focus);
          scope
            .$on(EXPENSE_EVENTS.isDeleted, focus);
          scope
            .$on(EXPENSE_EVENTS.isUpdated, focus);
        },
      };
    });
}());

(function () {
  'use strict';

  /* Account modal toggle */

  angular
    .module('revaluate.account')
    .directive('accountModalClose', function (AccountModal) {
      return {
        restrict: 'A',
        templateUrl: '/app/account/accountModal/accountModalCloseDirective.tpl.html',
        link: function (scope, el) {
          el.on('click', function () {
            AccountModal.close();
          });
        },
      };
    });
}());

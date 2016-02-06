'use strict';

export default angular
    .module('revaluate.account')
    .directive('accountModalToggle', function (AccountModal) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                el.on('click', function () {
                    AccountModal.openWithState(attrs.accountModalToggle);
                });
            }
        };
    })
    .name;

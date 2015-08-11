(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .directive('expenseFinishRender', function ($timeout) {
            return {
                link: function (scope) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            scope.$emit('ngRepeatExpenseFinished');
                        });
                    }
                }
            };
        });
}());

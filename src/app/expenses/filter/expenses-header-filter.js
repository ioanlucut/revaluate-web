angular
    .module("expenses")
    .filter('expensesHeader', function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<span class="expense-list-box__header__past">You have $1 expenses</span>' : '<span class="expense-list-box__header__upcoming">Your expenses</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    });
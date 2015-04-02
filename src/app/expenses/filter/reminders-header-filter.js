angular
    .module("expenses")
    .filter('remindersHeader', function ($sce) {
        return function (text, reverse) {
            var template = reverse ? '<a class="expense-list-box__header__past" href="#">You have $1 past expenses</a>' : '<span class="expense-list-box__header__upcoming">Your upcoming expenses</span>';

            return $sce.trustAsHtml(template.replace('$1', text || '0'))
        };
    });
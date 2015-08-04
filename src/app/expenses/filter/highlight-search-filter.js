(function () {
    'use strict';

    angular
        .module('revaluate.expenses')
        .filter('highlightSearch', function ($sce) {
            return function (text, phrase) {
                if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                    '<span class="expense__found--highlight">$1</span>');

                return $sce.trustAsHtml(text)
            };
        });
}());

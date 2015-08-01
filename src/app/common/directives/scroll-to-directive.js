(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('scrollTo', function () {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.on('click', function (e) {

                        $('html, body')
                            .animate({ scrollTop: $(attrs.scrollTo).offset().top }, parseInt(attrs.scrollSpeed) || 800);
                        e.preventDefault();
                    });
                }
            }
        });
}());

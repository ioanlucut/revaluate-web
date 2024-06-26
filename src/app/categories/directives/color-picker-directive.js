(function () {
    'use strict';

    angular
        .module('revaluate.categories')
        .directive('colorPicker', function (CATEGORY_EVENTS, CategoryColorService, $timeout, $animate) {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    categoryColor: '=',
                    colors: '='
                },
                templateUrl: '/app/categories/partials/color-picker-directive.tpl.html',
                link: function (scope, elm) {

                    // By default the popover is closed
                    scope.isOpen = false;

                    // Close the popover
                    scope.close = function () {
                        scope.isOpen = false;
                    };

                    // ---
                    // Label element clicks toggles the picker.
                    // ---
                    var label = elm.prev().prev().prev('label');

                    label.on('click', function () {
                        scope.$apply(function () {
                            scope.isOpen = !scope.isOpen;
                        });
                    });

                    var CLASS_OPEN = 'color-picker-box--open';

                    // Open or close the modal
                    scope.$watch('isOpen', function (isOpen, isOpenOld) {
                        if (isOpen === true) {
                            $animate.addClass(elm, CLASS_OPEN);
                        } else if (isOpen === false && isOpenOld === true) {
                            $animate.removeClass(elm, CLASS_OPEN);
                        }
                    });

                    // ---
                    // Select the color.
                    // ---
                    scope.select = function (chosenColor) {
                        scope.categoryColor = angular.copy(chosenColor);

                        scope.close();
                    };
                }
            };
        });
}());

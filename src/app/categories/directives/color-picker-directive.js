angular
    .module("categories")
    .directive("colorPicker", function (CATEGORY_EVENTS, $timeout, $animate) {
        return {
            restrict: "A",
            replace: true,
            scope: {
                categoryColor: "="
            },
            templateUrl: "app/categories/partials/color-picker-directive-template.html",
            link: function (scope, el, attrs) {

                // By default the popover is closed
                scope.isOpen = false;

                // Open the popover
                scope.open = function () {
                    scope.isOpen = true;
                };

                // Close the popover
                scope.close = function () {
                    scope.isOpen = false;
                };

                // ---
                // We check events on the sibling input.
                // ---
                var input = el.prev('input');

                input.on("focus", function () {
                    scope.$apply(function () {
                        scope.open();
                    });
                });

                input.on("blur", function () {
                    scope.$apply(function () {
                        scope.close();
                    });
                });

                var CLASS_OPEN = "color-picker-box--open";

                // Open or close the modal
                scope.$watch("isOpen", function (isOpen, isOpenOld) {
                    if ( isOpen === true ) {
                        $animate.addClass(el, CLASS_OPEN);
                    }
                    else if ( isOpen === false && isOpenOld === true ) {
                        $animate.removeClass(el, CLASS_OPEN);
                    }
                });

                // ---
                // Colors.
                // ---
                scope.colors = [
                    {
                        color: "#C3272B"
                    },
                    {
                        color: "#DB5A6B"
                    },
                    {
                        color: "#875F9A"
                    },
                    {
                        color: "#22A7F0"
                    },
                    {
                        color: "#317589"
                    },
                    {
                        color: "#1F4788"
                    },
                    {
                        color: "#006442"
                    },
                    {
                        color: "#26A65B"
                    },
                    {
                        color: "#36D7B7"
                    },
                    {
                        color: "#FFB61E"
                    },
                    {
                        color: "#CA6924"
                    },
                    {
                        color: "#6C7A89"
                    },
                    {
                        color: "#121212"
                    },
                    {
                        color: "#BDC3C7"
                    }];

                // ---
                // Select the color.
                // ---
                scope.select = function (chosenColor) {
                    scope.categoryColor = chosenColor.color;

                    scope.close();
                };
            }
        };
    });
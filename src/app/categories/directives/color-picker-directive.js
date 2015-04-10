angular
    .module("categories")
    .directive("popoverColorPickerPopup", function (CATEGORY_EVENTS) {
        return {
            restrict: "A",
            replace: true,
            scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" },
            templateUrl: "app/categories/partials/color-picker-directive-template.html",
            link: function (scope, el, attrs) {

                scope.colors = [
                    {
                        color: "#4FC1E9"
                    },
                    {
                        color: "#826274"
                    },
                    {
                        color: "#8471B1"
                    },
                    {
                        color: "#FFDD00"
                    },
                    {
                        color: "#bfdadc"
                    },
                    {
                        color: "#009800"
                    },
                    {
                        color: "#207de5"
                    },
                    {
                        color: "#FFDD00"
                    },
                    {
                        color: "#ED5565"
                    },
                    {
                        color: "#009800"
                    },
                    {
                        color: "#826274"
                    },
                    {
                        color: "#009800"
                    },
                    {
                        color: "#207de5"
                    },
                    {
                        color: "#d4c5f9"
                    }];

                scope.chose = function (chosenColor) {
                    scope.$emit(CATEGORY_EVENTS.colorSelected, chosenColor);
                };
            }
        };
    })

    .directive("popoverColorPicker", ["$tooltip", function ($tooltip) {
        return $tooltip("popoverColorPicker", "popover", "click");
    }]);
angular
    .module("categories")
    .directive("addCategory", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            controller: 'CategoryCreateCtrl',
            templateUrl: "app/categories/partials/add-category-directive-template.html",
            link: function (scope, el, attrs) {

                /**
                 * Show block content flag.
                 * @type {boolean}
                 */
                scope.showContent = true;

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;
                };

                /**
                 * On category created - hide everything.
                 */
                $rootScope.$on(CATEGORY_EVENTS.isCreated, function () {
                    scope.toggleContent();
                });
            }
        }
    });

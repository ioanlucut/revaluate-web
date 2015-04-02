angular
    .module("categories")
    .directive("editRemoveCategory", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            controller: 'CategoryEditRemoveCtrl',
            scope: {
                category: "="
            },
            templateUrl: "app/categories/partials/edit-remove-category.html",
            link: function (scope, el, attrs) {
                /**
                 * Show block content
                 * @type {boolean}
                 */
                scope.showContent = false;

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;
                };

                /**
                 * On category updated/deleted - hide everything.
                 */
                $rootScope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
                    if ( scope.category.model.id === args.category.model.id ) {
                        scope.toggleContent();
                    }
                });
                scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
                    if ( scope.category.model.id === args.category.model.id ) {
                        scope.toggleContent();
                    }
                });
            }
        }
    });

angular
    .module("categories")
    .directive("editRemoveCategory", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            controller: 'CategoryEditRemoveCtrl',
            scope: {
                category: "="
            },
            templateUrl: "app/categories/partials/edit-remove-category-directive-template.html",
            link: function (scope, el, attrs) {

                /**
                 * Keep the master backup
                 */
                scope.masterCategory = angular.copy(scope.category);

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
                 * Toggle and discard changes.
                 */
                scope.cancel = function () {
                    scope.toggleContent();

                    scope.category = angular.copy(scope.masterCategory);
                };

                /**
                 * On category updated/deleted - hide everything.
                 */
                $rootScope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
                    if ( scope.category.model.id === args.category.model.id ) {
                        scope.toggleContent();

                        // ---
                        // Update the master category.
                        // ---
                        scope.masterCategory = angular.copy(scope.category);
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

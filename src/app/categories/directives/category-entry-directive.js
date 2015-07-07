'use strict';

angular
    .module("revaluate.categories")
    .directive("categoryEntry", function ($rootScope, CATEGORY_EVENTS) {
        return {
            restrict: "A",
            scope: {
                category: "=",
                colors: "=",
                isMinimumNumberOfAllowedCategoriesExceeded: "&"
            },
            controller: 'CategoryEntryController',
            controllerAs: 'vm',
            templateUrl: "/app/categories/partials/category-entry-directive-template.html",
            link: function (scope, el, attrs) {

                /**
                 * Work with a copy - keep the master backup
                 */
                scope.categoryEntry = angular.copy(scope.category);

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

                    scope.categoryEntry = angular.copy(scope.category);
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
                        scope.category = angular.copy(scope.categoryEntry);
                        scope.categoryEntry = angular.copy(scope.category);
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

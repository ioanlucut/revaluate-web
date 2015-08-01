(function () {
    'use strict';

    angular
        .module('revaluate.categories')
        .directive('categoryEntry', function ($rootScope, CATEGORY_EVENTS) {
            return {
                restrict: 'A',
                scope: {
                    category: '=',
                    colors: '=',
                    isMinimumNumberOfAllowedCategoriesExceeded: '&'
                },
                controller: function ($scope, $rootScope, $timeout, CATEGORY_EVENTS) {

                    /* jshint validthis: true */
                    var vm = this;

                    /**
                     * Edit/update timeout
                     */
                    var TIMEOUT_DURATION = 300;

                    /**
                     * Work with a copy - keep the master backup
                     */
                    vm.categoryEntry = angular.copy($scope.category);

                    /**
                     * Update the category.
                     */
                    vm.updateCategory = function (categoryForm) {
                        if (categoryForm.$valid && !vm.isUpdating) {

                            vm.isUpdating = true;

                            vm
                                .categoryEntry
                                .save()
                                .then(function () {
                                    $timeout(function () {
                                        vm.isUpdating = false;
                                        $rootScope.$broadcast(CATEGORY_EVENTS.isUpdated, { category: vm.categoryEntry });
                                    }, TIMEOUT_DURATION);
                                })
                                .catch(function () {
                                    vm.isUpdating = false;
                                    vm.badPostSubmitResponse = true;
                                    $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: 'error' });
                                });
                        }
                    };

                    /**
                     * Remove category;
                     */
                    vm.deleteCategory = function () {
                        if (vm.isDeleting) {
                            return;
                        }

                        vm.isDeleting = true;

                        vm
                            .categoryEntry
                            .destroy()
                            .then(function () {
                                vm.isSuccessfullyDeleted = true;
                                $rootScope.$broadcast(CATEGORY_EVENTS.isDeleted, { category: vm.categoryEntry });
                            })
                            .catch(function () {
                                vm.isDeleting = false;
                                $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: 'error' });
                            });
                    };

                },

                controllerAs: 'vm',
                templateUrl: '/app/categories/partials/category-entry-directive.tpl.html',
                link: function (scope, el, attrs, vm) {

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

                        vm.categoryEntry = angular.copy(scope.category);
                    };

                    /**
                     * On category updated/deleted
                     */
                    $rootScope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
                        if (scope.category.model.id === args.category.model.id) {
                            scope.toggleContent();

                            // ---
                            // Update the master category.
                            // ---
                            scope.category = angular.copy(vm.categoryEntry);
                            vm.categoryEntry = angular.copy(scope.category);
                        }
                    });

                    scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
                        if (scope.category.model.id === args.category.model.id) {
                            scope.toggleContent();
                        }
                    });
                }
            }
        });
}());

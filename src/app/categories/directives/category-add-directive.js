(function () {
    'use strict';

    function AddCategoryController(CATEGORY_EVENTS, $scope, promiseTracker, Category, CategoryColorService, CategoryService) {

        var vm = this;

        /**
         * Create a saving tracker.
         */
        vm.saveTracker = promiseTracker();

        vm.initOrResetAddCategory = initOrResetAddCategory;

        /**
         * Saves the category.
         */
        vm.saveCategory = saveCategory;

        /**
         * Perform the first initialization.
         */
        vm.initOrResetAddCategory();

        function initOrResetAddCategory() {
            vm.category = new Category({ color: CategoryColorService.randomizedColor(vm.colors) });

            if (vm.categoryForm) {
                vm.categoryForm.$setPristine();
            }

            vm.badPostSubmitResponse = false;
        }

        function saveCategory() {
            CategoryService
                .createCategory(vm.category, vm.saveTracker)
                .then(function (createdCategory) {
                    $scope.$emit(CATEGORY_EVENTS.isCreated, { category: createdCategory });
                    vm.initOrResetAddCategory();
                })
                .catch(function () {
                    vm.badPostSubmitResponse = true;
                    $scope.$emit(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: 'Ups, something bad just happened.' });
                });
        }

    }

    angular
        .module('revaluate.categories')
        .directive('categoryAdd', function ($rootScope, promiseTracker, Category, CategoryService, CategoryColorService, CATEGORY_EVENTS) {
            return {
                restrict: 'A',
                scope: {
                    colors: '=',
                    isMaximumNumberOfAllowedCategoriesExceeded: '&'
                },
                controller: AddCategoryController,
                bindToController: true,
                controllerAs: 'vm',
                templateUrl: '/app/categories/partials/category-add-directive.tpl.html',
                link: function (scope) {

                    /**
                     * Show block content
                     */
                    scope.showContent = false;

                    /**
                     * Toggle content
                     */
                    scope.toggleContent = function () {
                        scope.showContent = !scope.showContent;
                    };

                    scope.$on(CATEGORY_EVENTS.isCreated, function () {
                        scope.toggleContent();
                    });
                }
            };
        });
}());

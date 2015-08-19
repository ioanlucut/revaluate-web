(function () {
    'use strict';

    /**
     * Categories controller.
     */
    angular
        .module('revaluate.categories')
        .controller('CategoryController', function ($rootScope, $scope, promiseTracker, ALERTS_EVENTS, Category, CategoryService, CategoryColorService, CATEGORY_EVENTS, $timeout, categories, USER_ACTIVITY_EVENTS, APP_CONFIG, ALERTS_CONSTANTS) {

            var vm = this;

            /**
             * Alert identifier
             */
            vm.alertId = ALERTS_CONSTANTS.createUpdateCategory;

            /**
             * The current user
             */
            vm.user = $rootScope.currentUser;

            /**
             * Existing colors
             */
            vm.colors = APP_CONFIG.ALL_COLORS;

            /**
             * Existing categories.
             */
            vm.categories = categories;

            vm.isMaximumNumberOfAllowedCategoriesExceeded = maximumNumberOfAllowedCategoriesExceeded;

            vm.isMinimumNumberOfAllowedCategoriesExceeded = isMinimumNumberOfAllowedCategoriesExceeded;

            vm.initOrResetAddCategory = initOrResetAddCategory;

            /**
             * Create a saving tracker.
             */
            vm.saveTracker = promiseTracker();

            /**
             * Saves the category.
             */
            vm.saveCategory = saveCategory;

            /**
             * Perform the first initialization.
             */
            vm.initOrResetAddCategory();

            function maximumNumberOfAllowedCategoriesExceeded() {
                return vm.categories.length >= APP_CONFIG.MAX_ALLOWED_CATEGORIES;
            }

            function isMinimumNumberOfAllowedCategoriesExceeded() {
                return vm.categories.length <= APP_CONFIG.MIN_ALLOWED_CATEGORIES;
            }

            function initOrResetAddCategory(categoryForm) {
                vm.category = new Category({ color: CategoryColorService.randomizedColor(vm.colors) });

                if (categoryForm) {
                    categoryForm.$setPristine();
                }

                vm.badPostSubmitResponse = false;
            }

            function saveCategory(categoryForm) {
                CategoryService
                    .createCategory(vm.category, vm.saveTracker)
                    .then(function (createdCategory) {
                        $rootScope.$broadcast(CATEGORY_EVENTS.isCreated, { category: createdCategory });
                        vm.initOrResetAddCategory(categoryForm);
                    })
                    .catch(function () {
                        vm.badPostSubmitResponse = true;
                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: 'Error' });
                    });
            }

            // ---
            // EVENT LISTENERS (listen for events from e.g. entries list).
            // ---

            /**
             * On category created, display a success message, and add category to the list.
             */
            $scope.$on(CATEGORY_EVENTS.isCreated, function (event, args) {
                vm.categories.push(args.category);

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Saved');
                $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.categoryCreated);
            });

            /**
             * On category updated.
             */
            $scope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
                _.remove(vm.categories, 'id', args.category.id);
                vm.categories.push(args.category);

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Updated');
                $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.categoryUpdated);
            });

            /**
             * On category deleted, display a success message, and remove the category from the list.
             */
            $scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
                _.remove(vm.categories, 'id', args.category.id);

                $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
                $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.categoryDeleted);
            });

            $scope.$on(CATEGORY_EVENTS.isErrorOccurred, function (event, args) {
                $scope.$emit(ALERTS_EVENTS.DANGER, {
                    message: args.errorMessage,
                    alertId: $scope.alertId
                });
            });

        });
}());

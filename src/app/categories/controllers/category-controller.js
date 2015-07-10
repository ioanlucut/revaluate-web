'use strict';

/**
 * Categories controller.
 */
angular
    .module("revaluate.categories")
    .controller("CategoryController", function ($rootScope, $scope, ALERTS_EVENTS, Category, CategoryColorService, CATEGORY_EVENTS, $timeout, categories, USER_ACTIVITY_EVENTS, APP_CONFIG, ALERTS_CONSTANTS) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * Saving timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Alert identifier
         */
        vm.alertId = ALERTS_CONSTANTS.createUpdateCategory;

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        vm.user = $rootScope.currentUser;

        /**
         * Existing colors
         * @type {colors|*}
         */
        vm.colors = APP_CONFIG.ALL_COLORS;

        /**
         * Existing categories.
         */
        vm.categories = categories;

        vm.isMaximumNumberOfAllowedCategoriesExceeded = function () {
            return vm.categories.length >= APP_CONFIG.MAX_ALLOWED_CATEGORIES;
        };

        vm.isMinimumNumberOfAllowedCategoriesExceeded = function () {
            return vm.categories.length <= APP_CONFIG.MIN_ALLOWED_CATEGORIES;
        };

        /**
         * Initialize or reset the state
         */
        vm.initOrReset = function (categoryForm) {
            vm.category = Category.build({ color: CategoryColorService.randomizedColor(vm.colors) });

            if ( categoryForm ) {
                categoryForm.$setPristine();
            }

            vm.badPostSubmitResponse = false;
        };

        /**
         * Perform the first initialization.
         */
        vm.initOrReset();

        /**
         * Saves the category or updates it.
         */
        vm.saveCategory = function (categoryForm) {
            if ( categoryForm.$valid && !vm.isSaving ) {

                // Is saving category
                vm.isSaving = true;

                vm
                    .category
                    .save()
                    .then(function () {
                        $timeout(function () {
                            vm.isSaving = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isCreated, { category: vm.category });

                            /**
                             * Finally, reset the form.
                             */
                            vm.initOrReset(categoryForm);
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        vm.isSaving = false;
                        vm.badPostSubmitResponse = true;

                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, { errorMessage: "error" });
                    });
            }
        };

        // ---
        // EVENT LISTENERS (listen for events from e.g. entries list).
        // ---

        /**
         * On category created, display a success message, and add category to the list.
         */
        $scope.$on(CATEGORY_EVENTS.isCreated, function (event, args) {
            vm.categories.push(args.category);

            $scope.$emit(ALERTS_EVENTS.SUCCESS, "Saved.");
            $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.categoryCreated);
        });

        /**
         * On category updated.
         */
        $scope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
            var result = _.some(vm.categories, function (topic) {
                return topic.model.id === args.category.model.id;
            });

            if ( result ) {
                removeCategoryFrom(vm.categories, args.category);
                vm.categories.push(args.category);
            }

            $scope.$emit(ALERTS_EVENTS.SUCCESS, "updated");
            $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.categoryUpdated)
        });

        /**
         * On category deleted, display a success message, and remove the category from the list.
         */
        $scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
            removeCategoryFrom(vm.categories, args.category);

            $scope.$emit(ALERTS_EVENTS.SUCCESS, "Deleted.");
            $scope.$emit("trackEvent", USER_ACTIVITY_EVENTS.categoryDeleted);
        });

        $scope.$on(CATEGORY_EVENTS.isErrorOccurred, function (event, args) {

            $scope.$emit(ALERTS_EVENTS.DANGER, {
                message: args.errorMessage,
                alertId: $scope.alertId
            });
        });

        /**
         * Removes given category from the list.
         */
        function removeCategoryFrom(categoryList, categoryToBeRemoved) {
            return _.remove(categoryList, function (categoryFromArray) {
                var categoryId = _.parseInt(categoryToBeRemoved.model.id, 10);
                var categoryFromArrayId = _.parseInt(categoryFromArray.model.id, 10);
                if ( _.isNaN(categoryFromArrayId) || _.isNaN(categoryId) ) {
                    return false;
                }

                return categoryFromArrayId === categoryId;
            });
        }
    });

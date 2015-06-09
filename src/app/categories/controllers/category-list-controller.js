/**
 * Categories controller.
 */
angular
    .module("revaluate.categories")
    .controller("CategoryListController", function ($scope, $rootScope, Category, flash, CATEGORY_EVENTS, $timeout, categories, colors, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {
        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateCategory;

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.categoriesPage);

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Existing colors
         * @type {colors|*}
         */
        $scope.colors = colors;

        /**
         * Existing categories.
         */
        $scope.categories = categories;

        $scope.$on(CATEGORY_EVENTS.isErrorOccurred, function () {

            flash.to($scope.alertIdentifierId).error = "This category could not be deleted.";
        });

        /**
         * On category created, display a success message, and add category to the list.
         */
        $scope.$on(CATEGORY_EVENTS.isCreated, function (event, args) {
            $scope.categories.push(args.category);

            flash.to($scope.alertIdentifierId).success = "Category successfully saved!";
        });

        /**
         * On category updated.
         */
        $scope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
            var result = _.some($scope.categories, function (topic) {
                return topic.model.id === args.category.model.id;
            });

            if ( result ) {
                removeCategoryFrom($scope.categories, args.category);
                $scope.categories.push(args.category);
            }

            flash.to($scope.alertIdentifierId).success = "Category successfully updated!";
        });

        /**
         * On category deleted, display a success message, and remove the category from the list.
         */
        $scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
            removeCategoryFrom($scope.categories, args.category);

            flash.to($scope.alertIdentifierId).success = "Category successfully deleted!";
        });

        /**
         * Removes given category from the list.
         * @param categoryList
         * @param categoryToBeRemoved
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
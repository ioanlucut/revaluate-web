/**
 * Categories controller.
 */
angular
    .module("categories")
    .controller("CategoryListCtrl", function ($scope, $rootScope, flash, CATEGORY_EVENTS, $timeout, categories, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.categoryList;

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
         * Existing categories.
         */
        $scope.categories = categories;

        /**
         * On category created, display a success message, and add category to the list.
         */
        $scope.$on(CATEGORY_EVENTS.isCreated, function (event, args) {
            categories.push(args.category);
        });

        /**
         * On category updated.
         */
        $scope.$on(CATEGORY_EVENTS.isUpdated, function (event, args) {
        });

        /**
         * On category deleted, display a success message, and remove the category from the list.
         */
        $scope.$on(CATEGORY_EVENTS.isDeleted, function (event, args) {
        });

        /**
         * On category un subscribed, display a success message, and remove the category from the list.
         */
        $scope.$on(CATEGORY_EVENTS.isUnSubscribed, function (event, args) {
        });
    });
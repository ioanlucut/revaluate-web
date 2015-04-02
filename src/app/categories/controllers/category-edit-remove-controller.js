angular
    .module("categories")
    .controller("CategoryEditRemoveCtrl", function ($scope, $rootScope, Category, $timeout, CATEGORY_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateCategory;

        /**
         * Saves the category or updates it.
         */
        $scope.updateCategory = function (categoryForm, category) {
            if ( categoryForm.$valid && !$scope.isUpdating ) {

                // Is saving category
                $scope.isUpdating = true;

                category
                    .save()
                    .then(function () {

                        const TIMEOUT_DURATION = 800;
                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryCreated);

                        $timeout(function () {
                            $scope.isUpdating = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isUpdated, {
                                category: category
                            });

                            flash.to($scope.alertIdentifierId).error = "Category successfully updated!";
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        $scope.isUpdating = false;
                        $scope.badPostSubmitResponse = true;
                        flash.to($scope.alertIdentifierId).error = "This category could not have been updated.";
                    });
            }
        };

        /**
         * Remove category - owner action;
         */
        $scope.deleteCategory = function (category) {
            if ( !$scope.isDeleting ) {

                // Is deleting category
                $scope.isDeleting = true;

                // Destroy category
                category
                    .destroy()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryDeleted);

                        $rootScope.$broadcast(CATEGORY_EVENTS.isDeleted, {
                            category: category
                        });
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };

    });

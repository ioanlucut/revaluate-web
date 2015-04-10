angular
    .module("categories")
    .controller("CategoryEditRemoveCtrl", function ($scope, $rootScope, Category, $timeout, CATEGORY_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Edit/update timeout
         */
        const TIMEOUT_DURATION = 300;

        /**
         * Update the category.
         */
        $scope.updateCategory = function (categoryForm, category) {
            if ( categoryForm.$valid && !$scope.isUpdating ) {

                // Is saving category
                $scope.isUpdating = true;

                category
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryCreated);

                        $timeout(function () {
                            $scope.isUpdating = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isUpdated, {
                                category: category
                            });

                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        $scope.isUpdating = false;
                        $scope.badPostSubmitResponse = true;
                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {});
                    });
            }
        };

        /**
         * Remove category;
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
                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {});
                    });
            }
        };

    });

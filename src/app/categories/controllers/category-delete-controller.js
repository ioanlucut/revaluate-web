angular
    .module("categories")
    .controller("CategoryDeleteCtrl", function ($scope, $rootScope, $stateParams, $window, $timeout, StatesHandler, CATEGORY_EVENTS, category, categoryIndex, MIXPANEL_EVENTS) {

        /**
         * Category to be created (injected with few default values)
         */
        $scope.category = category;

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isDeleting = false;

        /**
         * Dismiss the modal.
         */
        $scope.dismiss = function () {

            $scope.isModalOpened = false;
        };

        /**
         * Remove category - owner action;
         */
        $scope.deleteCategoryAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting category
                $scope.isDeleting = true;

                // Destroy category
                $scope.category.destroy()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryDeleted);

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            $rootScope.$broadcast(CATEGORY_EVENTS.isDeleted, {
                                category: $scope.category,
                                categoryIndex: categoryIndex,
                                message: 'Category successfully deleted!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };

        /**
         * Un subscribe from category - recipient action.
         */
        $scope.unSubscribeFromCategoryAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting category
                $scope.isDeleting = true;

                $scope.category.unSubscribe()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryUnSubscribed);

                        $timeout(function () {
                            $rootScope.$broadcast(CATEGORY_EVENTS.isUnSubscribed, {
                                category: $scope.category,
                                categoryIndex: categoryIndex,
                                message: 'Successfully un-subscribed from this category!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    });

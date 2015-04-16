angular
    .module("categories")
    .controller("CategoryCreateCtrl", function ($scope, $rootScope, CategoryColorService, Category, $timeout, CATEGORY_EVENTS, MIXPANEL_EVENTS) {

        /**
         * Saving timeout
         */
        const TIMEOUT_DURATION = 300;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (categoryForm) {
            $scope.category = Category.build({ color: CategoryColorService.randomizedColor().color });

            if ( categoryForm ) {
                categoryForm.$setPristine();
            }

            $scope.badPostSubmitResponse = false;
        };

        /**
         * Perform the first initialization.
         */
        $scope.initOrReset();

        /**
         * Saves the category or updates it.
         */
        $scope.saveCategory = function (categoryForm) {
            if ( categoryForm.$valid && !$scope.isSaving ) {

                // Is saving category
                $scope.isSaving = true;

                $scope.category
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryCreated);

                        $timeout(function () {
                            $scope.isSaving = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isCreated, {
                                category: $scope.category
                            });

                            /**
                             * Finally, reset the form.
                             */
                            $scope.initOrReset(categoryForm);
                        }, TIMEOUT_DURATION);
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        $scope.badPostSubmitResponse = true;

                        $rootScope.$broadcast(CATEGORY_EVENTS.isErrorOccurred, {});
                    });
            }
        };

    });

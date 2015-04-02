angular
    .module("categories")
    .controller("CategoryCreateCtrl", function ($scope, $rootScope, Category, $timeout, CATEGORY_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateCategory;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (categoryForm) {
            $scope.masterCategory = Category.build();
            $scope.category = angular.copy($scope.masterCategory);

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

                // Ok, update master category.
                angular.copy($scope.category, $scope.masterCategory);

                $scope.masterCategory
                    .save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.categoryCreated);

                        const TIMEOUT_DURATION = 800;
                        
                        $timeout(function () {
                            $scope.isSaving = false;

                            $rootScope.$broadcast(CATEGORY_EVENTS.isCreated, {
                                category: $scope.masterCategory
                            });

                            flash.to($scope.alertIdentifierId).error = "Category successfully saved!";

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
                        flash.to($scope.alertIdentifierId).error = "This category could not have been added.";
                    });
            }
        };

    });

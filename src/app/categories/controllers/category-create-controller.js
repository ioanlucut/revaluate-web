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
        $scope.initOrReset = function () {
            $scope.masterCategory = Category.build();
            $scope.category = angular.copy($scope.masterCategory);

            if ( $scope.categoryForm ) {
                $scope.categoryForm.$setPristine();
            }
        };

        /**
         * Perform the first initialization.
         */
        $scope.initOrReset();

        /**
         * Flag which says whether category is new or not.
         */
        $scope.isNew = $scope.category.isNew();

        /**
         * Flag which represents whether the category is currently saving.
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Saves the category or updates it.
         */
        $scope.saveCategory = function () {
            if ( $scope.categoryForm.$valid && !$scope.isSaving ) {

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
                        mixpanel.track($scope.isNew ? MIXPANEL_EVENTS.categoryCreated : MIXPANEL_EVENTS.categoryUpdated);

                        if ( $scope.isNew ) {
                            $timeout(function () {
                                $scope.isSaving = false;

                                $rootScope.$broadcast(CATEGORY_EVENTS.isCreated, {
                                    category: $scope.masterCategory
                                });

                                flash.to($scope.alertIdentifierId).error = "Category successfully saved!";
                            }, 800);
                        }
                        else {
                            $timeout(function () {
                                $scope.isSaving = false;

                                // Close the modal
                                $rootScope.$broadcast(CATEGORY_EVENTS.isUpdated, {
                                    category: $scope.masterCategory
                                });

                                flash.to($scope.alertIdentifierId).error = "Category successfully updated!";
                            }, 800);
                        }

                        /**
                         * Finally, reset the form.
                         */
                        $scope.initOrReset();
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

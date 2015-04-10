angular
    .module("categories")
    .controller("CategoryCreateCtrl", function ($scope, $rootScope, Category, $timeout, CATEGORY_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateCategory;

        /**
         * Saving timeout
         */
        const TIMEOUT_DURATION = 300;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (categoryForm) {
            $scope.category = Category.build();

            if ( categoryForm ) {
                categoryForm.$setPristine();
            }

            $scope.badPostSubmitResponse = false;
        };

        // ---
        // Listen for color select.
        // ---
        $scope.$on(CATEGORY_EVENTS.colorSelected, function (event, data) {
            $scope.category.model.color = data.color;
        });

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

angular
    .module("account")
    .controller("SignUpSetUpRegistrationCtrl", function ($q, $rootScope, $scope, $timeout, flash, ALERTS_CONSTANTS, SetupCategoriesProvider, StatesHandler, Category) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.signUpSetUp;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Profile user information
         */
        $scope.setUpData = {
            currency: {
                "currencyCode": "EUR"
            },
            initiated: true
        };

        /**
         * Saving timeout
         */
        const TIMEOUT_DURATION = 300;

        /**
         * Define categories
         */
        $scope.categories = SetupCategoriesProvider.getCategories();

        /**
         * Toggle category selection
         */
        $scope.toggleCategorySelection = function (index) {
            $scope.categories[index].selected = !$scope.categories[index].selected;
        };

        /**
         * Minimum categories to select
         */
        var minimumCategoriesToSelect = 3;

        /**
         * Update profile functionality.
         */
        $scope.setUp = function () {

            var selectedCategories = _.filter($scope.categories, 'selected', true);

            // ---
            // If categories are not selected, do not update the user.
            // ---
            if ( selectedCategories.length < minimumCategoriesToSelect ) {

                flash.to($scope.alertIdentifierId).error = 'You need to select at least three categories.';

                return;
            }

            if ( $scope.isSaving ) {
                return;
            }

            // ---
            // Put all promises in one array.
            // ---
            var promises = [];
            _.each(selectedCategories, function (category) {
                promises.push(Category.build(category).save());
            });

            // ---
            // This is the final deferred to update the user.
            // ---
            var deferred = $q.defer();

            // ---
            // Flag is saving flag.
            // ---
            $scope.isSaving = true;

            // ---
            // Try to save them at once and if successfully, update the user.
            // ---
            $q
                .all(promises)
                .then(function () {
                    $scope.user
                        .$save($scope.setUpData)
                        .then(function () {
                            deferred.resolve();
                        })
                        .catch(function (response) {
                            return deferred.reject(response);
                        })
                })
                .catch(function (response) {
                    return deferred.reject(response);
                });

            // ---
            // Wait for the final deferred.
            // ---
            deferred
                .promise
                .then(function () {
                    $timeout(function () {
                        $scope.isSaving = false;
                        flash.to($scope.alertIdentifierId).error = "Set up successfully!";

                        /**
                         * Finally, go to expenses.
                         */
                        StatesHandler.goToExpenses();
                    }, TIMEOUT_DURATION);
                })
                .catch(function () {

                    // Error
                    $scope.isSaving = false;
                    flash.to($scope.alertIdentifierId).error = "Set up could not have been performed.";
                });
        };

    });
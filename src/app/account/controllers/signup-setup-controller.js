angular
    .module("account")
    .controller("SignUpSetUpRegistrationCtrl", function ($rootScope, $scope, $timeout, flash, ALERTS_CONSTANTS, SetupCategoriesProvider, StatesHandler) {

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
            }
            else {
                StatesHandler.goToExpenses();
            }
        };

    });
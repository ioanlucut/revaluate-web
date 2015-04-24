angular
    .module("account")
    .controller("SignUpSetUpRegistrationController", function ($q, $rootScope, $scope, $timeout, flash, AuthService, AUTH_EVENTS, ALERTS_CONSTANTS, CategoriesSetupProvider, CategoryColorService, SessionService, StatesHandler, Category, currencies) {

        /**
         * All given currencies.
         * @type {currencies|*}
         */
        $scope.currencies = currencies;

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
         * Selected currency
         * @type {{}}
         */
        $scope.currency = {};

        /**
         * Saving timeout
         */
        const TIMEOUT_DURATION = 300;

        /**
         * Define categories
         */
        $scope.categories = CategoriesSetupProvider.getCategories();

        /**
         * Category to be added on the fly
         * @type {string}
         */
        $scope.categoryOnTheFly = "";

        /**
         * Show block content
         * @type {boolean}
         */
        $scope.showCategoryOnTheFlyInput = false;

        /**
         * Toggle content
         */
        $scope.toggleContent = function () {
            $scope.showCategoryOnTheFlyInput = !$scope.showCategoryOnTheFlyInput;
        };

        /**
         * Trigger submit of the category on the fly nested form
         */
        $scope.triggerSubmit = function () {
            $scope.$broadcast('add-category-on-the-fly-event');
        };

        /**
         * Add a custom category to existing ones (only if name is unique)
         */
        $scope.onSubmitted = function ($event) {
            $event.stopPropagation();

            $scope.setUpForm.categoryOnTheFlyForm.$submitted = true;
            if ( $scope.setUpForm.categoryOnTheFlyForm.$invalid ) {
                return;
            }

            var result = _.some($scope.categories, function (category) {
                return category.name === $scope.categoryOnTheFly;
            });

            if ( result ) {
                flash.to($scope.alertIdentifierId).success = "Category is not unique";
            }
            else {
                $scope.categories.push({
                    name: $scope.categoryOnTheFly,
                    color: CategoryColorService.randomizedColor().color,
                    selected: true
                });

                // ---
                // Reinitialize the value and form.
                // ---
                $scope.showCategoryOnTheFlyInput = false;
                $scope.categoryOnTheFly = "";
                $scope.setUpForm.categoryOnTheFlyForm.$setPristine();
            }
        };

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

        function getSelectedCategories() {
            return _.filter($scope.categories, 'selected', true);
        }

        /**
         * Is enough selected categories
         */
        $scope.isEnoughSelectedCategories = function () {
            return getSelectedCategories().length >= minimumCategoriesToSelect;
        };

        /**
         * Update profile functionality.
         */
        $scope.setUp = function () {
            if ( $scope.setUpForm.$invalid || $scope.isSaving ) {

                return;
            }

            var selectedCategories = angular.copy(getSelectedCategories());
            var toBeSaved = {
                currency: angular.copy($scope.currency.originalObject),
                initiated: true
            };

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
                        .$save(toBeSaved)
                        .then(function (response) {
                            deferred.resolve(response);
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
                .then(function (response) {
                    $timeout(function () {
                        // ---
                        // We need to set the data and refresh the user.
                        // ---
                        SessionService.setData(response.data);
                        $rootScope.$broadcast(AUTH_EVENTS.refreshUser, response);

                        // ---
                        // Show some feedback.
                        // ---
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
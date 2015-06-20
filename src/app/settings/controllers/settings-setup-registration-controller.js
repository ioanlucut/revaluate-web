'use strict';

angular
    .module("revaluate.settings")
    .controller("SettingsSetUpRegistrationController", function ($q, $scope, $rootScope, $timeout, flash, AuthService, CategoryService, AUTH_EVENTS, ALERTS_CONSTANTS, MIXPANEL_EVENTS,  CategoryColorService, SessionService, StatesHandler, Category, currencies) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * All given currencies.
         * @type {currencies|*}
         */
        vm.currencies = currencies;

        /**
         * Alert identifier
         */
        vm.alertIdentifierId = ALERTS_CONSTANTS.signUpSetUp;

        /**
         * Current user.
         * @type {$rootScope.currentUser|*}
         */
        vm.user = $rootScope.currentUser;

        /**
         * Selected currency
         * @type {{}}
         */
        vm.currency = {};

        /**
         * Saving timeout
         */
        var TIMEOUT_DURATION = 300;

        /**
         * Existing predefined colors.
         */
        vm.colors = APP_CONFIG.ALL_COLORS;

        /**
         * Existing predefined categories.
         */
        vm.categories = APP_CONFIG.PREDEFINED_CATEGORIES;

        // ---
        // Populate predefined categories with colors.
        // ---
        vm.categories = _.map(vm.categories, function (category) {
            return {
                name: category,
                selected: true,
                color: vm.colors[vm.categories.indexOf(category)]
            };
        });

        /**
         * Category to be added on the fly
         * @type {string}
         */
        vm.categoryOnTheFly = "";

        /**
         * Show block content
         * @type {boolean}
         */
        vm.showCategoryOnTheFlyInput = false;

        /**
         * Toggle content
         */
        vm.toggleContent = function () {
            vm.showCategoryOnTheFlyInput = !vm.showCategoryOnTheFlyInput;
        };

        /**
         * Trigger submit of the category on the fly nested form
         */
        vm.triggerSubmit = function () {
            $scope.$broadcast('add-category-on-the-fly-event');
        };

        /**
         * To be called when on blur.
         */
        vm.cancelAddCategoryOnTheFly = function () {
            resetCategoryOnTheFlyForm();
        };

        /**
         * Reset the category on the fly
         */
        function resetCategoryOnTheFlyForm() {
            vm.showCategoryOnTheFlyInput = false;
            vm.categoryOnTheFly = "";
            vm.setUpForm.categoryOnTheFlyForm.$setPristine();
            vm.badPostSubmitResponse = false;

            // ---
            // If there was a previously error, just clear it.
            // ---
            flash.to(vm.alertIdentifierId).error = '';
        }

        /**
         * Add a custom category to existing ones (only if name is unique)
         */
        vm.onSubmitted = function ($event) {
            $event.stopPropagation();

            vm.setUpForm.categoryOnTheFlyForm.$submitted = true;
            if ( vm.setUpForm.categoryOnTheFlyForm.$invalid ) {
                return;
            }

            var result = _.some(vm.categories, function (category) {
                return category.name === vm.categoryOnTheFly;
            });

            if ( result ) {
                flash.to(vm.alertIdentifierId).error = "Category is not unique";
            }
            else {
                vm.categories.push({
                    name: vm.categoryOnTheFly,
                    color: CategoryColorService.randomizedColor(vm.colors),
                    selected: true
                });

                // ---
                // Reinitialize the value and form.
                // ---
                resetCategoryOnTheFlyForm();
            }
        };

        /**
         * Toggle category selection
         */
        vm.toggleCategorySelection = function (index) {
            vm.categories[index].selected = !vm.categories[index].selected;
        };

        /**
         * Minimum categories to select
         */
        var MIN_CATEGORIES_TO_SELECT = 3;

        function getSelectedCategories() {
            return _.filter(vm.categories, 'selected', true);
        }

        /**
         * Is enough selected categories
         */
        vm.isEnoughSelectedCategories = function () {
            return getSelectedCategories().length >= MIN_CATEGORIES_TO_SELECT;
        };

        /**
         * Update profile functionality.
         */
        vm.setUp = function () {
            if ( vm.setUpForm.$invalid || vm.isSaving ) {

                return;
            }

            var selectedCategories = angular.copy(getSelectedCategories());
            var userProfileToBeUpdated = {
                currency: angular.copy(vm.currency.selected),
                initiated: true
            };

            // ---
            // We perform a bulk create.
            // ---
            var selectedCategoriesToBeSaved = _.map(selectedCategories, function (categoryDTO) {
                return Category.build(categoryDTO);
            });

            // ---
            // This is the final deferred to update the user.
            // ---
            var deferred = $q.defer();

            // ---
            // Flag is saving flag.
            // ---
            vm.isSaving = true;

            // ---
            // Try to save them at once and if successfully, update the user.
            // ---
            CategoryService
                .bulkCreate(selectedCategoriesToBeSaved)
                .then(function () {
                    vm.user
                        .save(userProfileToBeUpdated)
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

                        mixpanel.track(MIXPANEL_EVENTS.accountSetupFinished);

                        // ---
                        // Show some feedback.
                        // ---
                        vm.isSaving = false;
                        flash.to(vm.alertIdentifierId).success = "Set up successfully! Preparing expenses..";

                        /**
                         * Finally, go to expenses.
                         */
                        StatesHandler.goToExpenses();
                    }, TIMEOUT_DURATION);
                })
                .catch(function () {

                    // Error
                    vm.isSaving = false;
                    flash.to(vm.alertIdentifierId).error = "Set up could not have been performed.";
                    vm.badPostSubmitResponse = true;
                });
        };

    });

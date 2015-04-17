angular
    .module("expenses")
    .controller("ExpenseCreateController", function ($scope, $rootScope, $stateParams, Expense, categories, $window, DatesUtils, $timeout, StatesHandler, EXPENSE_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateExpense;

        /**
         * Existing categories.
         */
        $scope.categories = categories;

        /**
         * Saving timeout
         */
        const TIMEOUT_DURATION = 800;

        /**
         * Initialize or reset the state
         */
        $scope.initOrReset = function (expenseForm) {
            /**
             * Keep master expense.
             * @type {XMLList|XML|*}
             */
            $scope.masterExpense = Expense.build({
                category: categories[0].model,
                spentDate: moment().toDate()
            });

            /**
             * Work with a copy of master expense
             */
            $scope.expense = angular.copy($scope.masterExpense);

            /**
             * Flag which says whether expense is new or not.
             */
            $scope.isNew = $scope.expense.isNew();

            if ( expenseForm ) {
                expenseForm.$setPristine();
            }

            $scope.badPostSubmitResponse = false;
        };

        /**
         * Perform the first initialization.
         */
        $scope.initOrReset();

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.minDate = moment().year(2000);

        /**
         * Open date picker
         * @param $event
         */
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        /**
         * Saves the expense or updates it.
         */
        $scope.saveExpense = function () {
            if ( $scope.expenseForm.$valid && !$scope.isSaving ) {

                // Is saving expense
                $scope.isSaving = true;

                // Ok, update master expense.
                angular.copy($scope.expense, $scope.masterExpense);

                $scope.masterExpense.save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track($scope.isNew ? MIXPANEL_EVENTS.expenseCreated : MIXPANEL_EVENTS.expenseUpdated);

                        if ( $scope.isNew ) {
                            $timeout(function () {
                                $scope.isSaving = false;

                                $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, {
                                    expense: $scope.masterExpense
                                });
                            }, TIMEOUT_DURATION);
                        }
                        else {
                            $timeout(function () {
                                $scope.isSaving = false;

                                // Close the modal
                                $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, {
                                    expense: $scope.masterExpense
                                });
                            }, TIMEOUT_DURATION);
                        }

                        /**
                         * Finally, reset the form.
                         */
                        $scope.initOrReset();
                    })
                    .catch(function () {

                        // Error
                        $scope.isSaving = false;
                        alert("Something went wrong. Please try again.");
                    })
                    .finally(function () {

                        $scope.isModalOpened = false;
                    });
            }
        };

    });

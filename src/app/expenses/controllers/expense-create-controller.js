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

            //clear the input
            $scope.$broadcast('angucomplete-alt:clearInput');

            /**
             * Keep master expense.
             * @type {XMLList|XML|*}
             */
            $scope.masterExpense = Expense.build({
                spentDate: moment().toDate()
            });

            /**
             * Work with a copy of master expense
             */
            $scope.expense = angular.copy($scope.masterExpense);

            /**
             * Selected category
             * @type {{}}
             */
            $scope.category = {};

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
         * Max date to create expense
         */
        $scope.maxDate = moment().hours(0).minutes(0).seconds(0);

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

                var isDateInFuture = moment().diff($scope.expense.model.spentDate || $scope.expenseForm.spentDate) <= 0;
                if ( isDateInFuture ) {
                    $scope.expenseForm.spentDate.$setValidity('validDate', false);

                    return;
                }

                // Is saving expense
                $scope.isSaving = true;

                // Update the  chosen category
                $scope.expense.model.category = angular.copy($scope.category.originalObject.model);
                // Ok, update master expense.
                angular.copy($scope.expense, $scope.masterExpense);

                $scope.masterExpense.save()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track($scope.isNew ? MIXPANEL_EVENTS.expenseCreated : MIXPANEL_EVENTS.expenseUpdated);

                        var expenseToBePushed = angular.copy($scope.masterExpense);
                        if ( $scope.isNew ) {
                            $timeout(function () {
                                $scope.isSaving = false;

                                $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, {
                                    expense: expenseToBePushed
                                });
                            }, TIMEOUT_DURATION);
                        }
                        else {
                            $timeout(function () {
                                $scope.isSaving = false;

                                $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, {
                                    expense: expenseToBePushed
                                });
                            }, TIMEOUT_DURATION);
                        }

                        /**
                         * Finally, reset.
                         */
                        $scope.initOrReset($scope.expenseForm);
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

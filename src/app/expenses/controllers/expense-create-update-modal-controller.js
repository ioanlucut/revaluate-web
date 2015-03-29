angular
    .module("expenses")
    .controller("ExpenseModalCtrl", function ($scope, $rootScope, $stateParams, $window, ExpenseModalService, ExpenseUpdateModalService, expense, expenseIndex, $timeout, StatesHandler, EXPENSE_EVENTS, flash, MIXPANEL_EVENTS, ALERTS_CONSTANTS, DATE_SOURCE) {

        /**
         * Alert identifier
         */
        $scope.alertIdentifierId = ALERTS_CONSTANTS.createUpdateExpense;

        /**
         * Keep master expense.
         * @type {XMLList|XML|*}
         */
        $scope.masterExpense = expense;

        /**
         * Work with a copy of master expense
         */
        $scope.expense = angular.copy($scope.masterExpense);

        /**
         * Flag which says whether expense is new or not.
         */
        $scope.isNew = $scope.expense.isNew();

        /**
         * Set the date source - if is update action.
         */
        if ( !$scope.isNew ) {
            $scope.expense.model.dueOn[DATE_SOURCE.isFromUpdateAction] = true;
        }

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isSaving = false;

        /**
         * Minimum date to create expense.
         * @type {Date}
         */
        $scope.minDate = moment().hours(0).minutes(0).seconds(0);

        /**
         * Expense examples pool
         * @type {string[]}
         */
        var expenseExamples = [
            "Pay rent @tomorrow at 3pm",
            "Josh's birthday party @next Friday at 18:00",
            "Christmas gifts @dec 20 at 3pm",
            "Send email to Rachel @in 4 hours",
            "Team meeting @10am",
            "My brother's wedding next month @June 22"
        ];

        /**
         * Random expense example
         * @type {string}
         */
        $scope.randomExample = expenseExamples[Math.floor((Math.random() * expenseExamples.length))];

        /**
         * If create expense modal is opened
         */
        if ( ExpenseModalService.modalInstance ) {
            ExpenseModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isModalOpened = true;
                }
            );
        }

        /**
         * If update expense modal is opened
         */
        if ( ExpenseUpdateModalService.modalInstance ) {
            ExpenseUpdateModalService.modalInstance
                .opened
                .then(function () {
                    $scope.isModalOpened = true;
                }
            );
        }

        /**
         * Dismiss the create/update modal.
         */
        $scope.dismissFeedbackModal = function () {
            var currentModal = $scope.isNew ? ExpenseModalService.modalInstance : ExpenseUpdateModalService.modalInstance;
            currentModal.dismiss("cancel");

            $scope.isModalOpened = false;
        };

        /**
         * Saves the expense or updates it.
         * @param expenseForm
         */
        $scope.saveExpense = function (expenseForm) {
            if ( expenseForm.$valid && !$scope.isSaving ) {

                var isDateInPast = moment().diff($scope.expense.model.dueOn || expenseForm.selectedDate) > 0;
                if ( expenseForm.selectedDate.$invalid && !isDateInPast ) {
                    expenseForm.selectedDate.$setValidity('validDate', false);
                    flash.to($scope.alertIdentifierId).error = "Please make sure that the date and time are in the future.";

                    return;
                }

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

                                ExpenseModalService.modalInstance.close();
                                $rootScope.$broadcast(EXPENSE_EVENTS.isCreated, {
                                    expense: $scope.masterExpense,
                                    message: 'Expense successfully saved!'
                                });
                            }, 800);
                        }
                        else {
                            $timeout(function () {
                                $scope.isSaving = false;

                                // Close the modal
                                ExpenseUpdateModalService.modalInstance.close();
                                $rootScope.$broadcast(EXPENSE_EVENTS.isUpdated, {
                                    expense: $scope.masterExpense,
                                    expenseIndex: expenseIndex,
                                    message: 'Expense successfully updated!'
                                });
                            }, 800);
                        }
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

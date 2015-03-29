angular
    .module("expenses")
    .controller("ExpenseDeleteModalCtrl", function ($scope, $rootScope, $stateParams, $window, ExpenseDeleteModalService, $timeout, StatesHandler, EXPENSE_EVENTS, expense, expenseIndex, MIXPANEL_EVENTS) {

        /**
         * Expense to be created (injected with few default values)
         */
        $scope.expense = expense;

        /**
         * The current user
         * @type {$rootScope.currentUser|*}
         */
        $scope.user = $rootScope.currentUser;

        /**
         * Flag which represents whether
         * @type {boolean}
         */
        $scope.isDeleting = false;

        /**
         * Dismiss the modal.
         */
        $scope.dismiss = function () {
            ExpenseDeleteModalService.modalInstance.dismiss("cancel");

            $scope.isModalOpened = false;
        };

        /**
         * Remove expense - owner action;
         */
        $scope.deleteExpenseAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting expense
                $scope.isDeleting = true;

                // Destroy expense
                $scope.expense.destroy()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseDeleted);

                        // Wait 2 seconds, and close the modal
                        $timeout(function () {
                            ExpenseDeleteModalService.modalInstance.close();
                            $rootScope.$broadcast(EXPENSE_EVENTS.isDeleted, {
                                expense: $scope.expense,
                                expenseIndex: expenseIndex,
                                message: 'Expense successfully deleted!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };

        /**
         * Un subscribe from expense - recipient action.
         */
        $scope.unSubscribeFromExpenseAndClose = function () {
            if ( !$scope.isDeleting ) {

                // Is deleting expense
                $scope.isDeleting = true;

                $scope.expense.unSubscribe()
                    .then(function () {

                        /**
                         * Track event.
                         */
                        mixpanel.track(MIXPANEL_EVENTS.expenseUnSubscribed);

                        $timeout(function () {
                            ExpenseDeleteModalService.modalInstance.close();
                            $rootScope.$broadcast(EXPENSE_EVENTS.isUnSubscribed, {
                                expense: $scope.expense,
                                expenseIndex: expenseIndex,
                                message: 'Successfully un-subscribed from this expense!'
                            });
                        }, 400);
                    })
                    .catch(function () {

                        // Error
                        $scope.isDeleting = false;
                        alert("Something went wrong. Please try again.");
                    });
            }
        };
    });

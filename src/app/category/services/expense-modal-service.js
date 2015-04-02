/* Feedback modal */

angular
    .module("expenses")
    .service("ExpenseModalService", function ($modal) {

        /**
         * Expense modal instance.
         * @type {null}
         */
        this.modalInstance = null;

        /**
         * Define expense modal object.
         */
        this.open = function () {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/expenses/partials/expenseModal/expense_create_update_modal.html",
                controller: "ExpenseModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    expense: function ($window, $rootScope, Expense, DatesUtils) {
                        return Expense.build({
                            text: "",
                            dueOn: DatesUtils.prepareDate(),
                            timezone: jstz.determine().name(),
                            recipients: [{ email: $rootScope.currentUser.model.email }]
                        });
                    },
                    expenseIndex: function () {
                        return -1;
                    }
                }
            });
        };

    });

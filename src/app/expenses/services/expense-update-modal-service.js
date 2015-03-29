/* Feedback modal */

angular
    .module("expenses")
    .service("ExpenseUpdateModalService", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (expenseToBeUpdated, expenseIndex) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/expenses/partials/expenseModal/expense_create_update_modal.html",
                controller: "ExpenseModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    expense: function () {
                        return expenseToBeUpdated;
                    },
                    expenseIndex: function () {
                        return expenseIndex;
                    }
                }
            });
        };

    });

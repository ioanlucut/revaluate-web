/* Feedback modal */

angular
    .module("expenses")
    .service("ExpenseDeleteModalService", function ($modal) {

        // Init modal instance
        this.modalInstance = null;

        // Init the feedback modal window
        this.open = function (expenseToBeDeleted, expenseIndex) {

            // Create modal instance
            this.modalInstance = $modal.open({
                templateUrl: "app/expenses/partials/expenseModal/expense_delete_modal.html",
                controller: "ExpenseDeleteModalCtrl",
                windowClass: "modal-feedback",
                resolve: {
                    expense: function () {
                        return expenseToBeDeleted;
                    },
                    expenseIndex: function () {
                        return expenseIndex;
                    }
                }
            });
        };

    });

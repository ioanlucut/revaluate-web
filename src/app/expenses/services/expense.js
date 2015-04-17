angular
    .module("expenses")
    .factory("Expense", function ($q, $http, ExpenseService, ExpenseTransformerService) {

        /**
         * Expense class.
         * @constructor
         */
        function Expense() {

            /**
             * Represents the DTO model of the expense.
             */
            this.model = {

                /**
                 * The expense id.
                 */
                id: "",

                /**
                 * The expense description.
                 */
                category: "",

                /**
                 * The expense value
                 */
                value: "",

                /**
                 * The expense description.
                 */
                description: "",

                /**
                 * The expense creation date
                 */
                createdAt: "",

                /**
                 * Create date of the expense.
                 */
                spentDate: ""
            };

            /**
             * Is expense new.
             * @returns {boolean}
             */
            this.isNew = function () {
                return this.model.id === "" || _.isUndefined(this.model.id);
            };

            /**
             * Saves a expense and update model with response.
             * @returns {*}
             */
            this.save = function () {
                if ( this.isNew() ) {
                    return ExpenseService.createExpense(this);
                }
                else {
                    return ExpenseService.updateExpense(this);
                }
            };

            /**
             * Destroys (deletes) a expense.
             * @returns {*}
             */
            this.destroy = function () {
                return ExpenseService.deleteExpense(this);
            };

        }

        /**
         * Builds a expense with given data.
         * @param data
         * @returns {Expense}
         */
        Expense.build = function (data) {
            if ( _.isEmpty(data) ) {
                return new Expense();
            }

            return ExpenseTransformerService.toExpense(data, new Expense());
        };

        return Expense;
    });
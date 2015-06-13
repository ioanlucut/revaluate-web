'use strict';

angular
    .module("revaluate.expenses")
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
                category: {},

                /**
                 * The expense value
                 */
                value: 0,

                /**
                 * The expense description.
                 */
                description: "",

                /**
                 * Create date of the expense.
                 */
                spentDate: ""
            };

            /**
             * Shows if this expense is marked (can be used e.g. in a bulk list)
             * @type {boolean}
             */
            this.marked = false;

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

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
                expenseId: "",

                /**
                 * The expense text.
                 */
                text: "",

                /**
                 * The expense due date
                 */
                dueOn: "",

                /**
                 * The timezone
                 */
                timezone: "",

                /**
                 * The recipients (array of object, with email as key)
                 */
                recipients: [],

                /**
                 * The user which is the owner of this expense
                 */
                createdByUser: {},

                /**
                 * Expense id of the user which created this expense.
                 */
                createdBy: "",

                /**
                 * If expense is already sent.
                 */
                sent: "",

                /**
                 * Create date of the expense.
                 */
                createdAt: "",

                /**
                 * Update date of the expense.
                 */
                updatedAt: ""
            };

            /**
             * Is expense new.
             * @returns {boolean}
             */
            this.isNew = function () {
                return this.model.expenseId === "" || _.isUndefined(this.model.expenseId);
            };

            /**
             * Is expense in past.
             * @returns {boolean}
             */
            this.inPast = function () {
                if ( this.model.dueOn === "" || _.isUndefined(this.model.dueOn) ) {
                    return false;
                }
                return moment().diff(this.model.dueOn, 'days') > 0;
            };

            /**
             * The given email is the user of this expense.
             * @returns {boolean}
             */
            this.isCreatedBy = function (email) {
                if ( _.isUndefined(email) ) {
                    return false;
                }

                return this.model.createdByUser.email === email;
            };

            /**
             * The recipients are more then one.
             * @returns {boolean}
             */
            this.isManyRecipients = function () {
                if ( _.isUndefined(this.model.recipients) ) {
                    return false;
                }

                return this.model.recipients.length > 1;
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
             * UnSubscribe a recipient from this expense and update model with response.
             * @returns {*}
             */
            this.unSubscribe = function () {
                return ExpenseService.unSubscribeFromExpense(this);
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
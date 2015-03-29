/**
 * Expense group service which computes the upcoming and past expenses from a list.
 */
angular
    .module("expenses")
    .service("ExpenseGroupService", function () {

        /**
         * Returns an object with past and upcoming expenses.
         * @param expenses
         * @returns {{}}
         */
        this.getPastAndUpcomingExpenses = function (expenses) {

            /**
             * Used to check the past/upcoming expenses.
             * @type {Date}
             */
            var now = new Date();

            /**
             * Expenses grouped by upcoming and past expenses.
             */
            var expensesGrouped = _.chain(expenses)
                .groupBy(function (element) {
                    return element.model.dueOn < now;
                })
                .toArray()
                .value();

            /**
             * To be computed
             * @type {Array}
             */
            var upcomingExpenses = [];
            var pastExpenses = [];

            /**
             * We group expenses by date, but if they are all in the same category, they will always be on the first category
             */
            if ( expensesGrouped.length === 2 ) {
                upcomingExpenses = expensesGrouped[0];
                pastExpenses = expensesGrouped[1];
            }
            else if ( expensesGrouped.length === 1 ) {
                var firstGroupedExpensesResult = expensesGrouped[0];
                var groupedExpensesAreInPast = firstGroupedExpensesResult[0].model.dueOn < now;

                if ( groupedExpensesAreInPast ) {
                    pastExpenses = firstGroupedExpensesResult;
                }
                else {
                    upcomingExpenses = firstGroupedExpensesResult;
                }
            }

            return {
                pastExpenses: pastExpenses,
                upcomingExpenses: upcomingExpenses
            }

        };
    });

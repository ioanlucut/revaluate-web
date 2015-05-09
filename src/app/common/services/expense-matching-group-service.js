angular
    .module("revaluate.common")
    .factory("ExpenseMatchingGroupService", function () {
        var now = moment();
        var expensesGroup = [
            {
                name: 'Today',
                diff: { date: moment().set('day', now.day()), unit: 'day' }
            },
            {
                name: 'Tomorrow',
                diff: { date: moment().set('day', now.day() + 1), unit: 'day' }
            },
            {
                name: 'Yesterday',
                diff: { date: moment().set('day', now.day() - 1), unit: 'day' }
            },
            {
                name: 'This month',
                diff: { date: moment().set('month', now.month()), unit: 'month' }
            },
            {
                name: 'Next month',
                diff: { date: moment().set('month', now.month() + 1), unit: 'month' }
            },
            {
                name: 'Last month',
                diff: { date: moment().set('month', now.month() - 1), unit: 'month' }
            }
        ];

        return {

            /**
             * Populate expenses with matching groups
             */
            populateExpensesWithMatchingGroups: function (expenses, reverseOrder) {

                _.each(expenses, function (expense) {
                    var matchingGroupFound = _.find(expensesGroup, function (expensesGroup) {
                        return expensesGroup.diff.date.isSame(expense.model.spentDate, expensesGroup.diff.unit);
                    });

                    if ( !matchingGroupFound ) {
                        var expenseDueOn = moment(expense.model.spentDate);
                        var isSameYear = moment(moment().year()).isSame(expenseDueOn.year());

                        // ---
                        // If no matching group is found, create one with expenses month.
                        // ---

                        expense.matchingGroup = {
                            name: expenseDueOn.format(isSameYear ? 'MMMM' : 'MMMM, YYYY'),
                            diff: {
                                date: moment(expenseDueOn), unit: 'month'
                            }
                        };
                    }
                    else {
                        expense.matchingGroup = matchingGroupFound;
                    }
                });
            },

            /**
             * Populate expense with matching group
             */
            populateExpenseWithMatchingGroup: function (expense, reverseOrder) {
                return this.populateExpensesWithMatchingGroups([expense], reverseOrder);
            }
        };
    });

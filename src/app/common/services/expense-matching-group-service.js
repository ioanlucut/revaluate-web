angular
    .module("common")
    .service("ExpenseMatchingGroupService", function () {

        this.getExpensesGroups = function () {
            var now = moment();

            return [
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
        };

        /**
         * Populate expenses with matching groups
         */
        this.populateExpensesWithMatchingGroups = function (expenses, reverseOrder) {
            var expensesGroup = this.getExpensesGroups();

            _.each(expenses, function (expense) {
                var matchingGroupFound = _.find(expensesGroup, function (expensesGroup) {
                    return expensesGroup.diff.date.isSame(expense.model.dueOn, expensesGroup.diff.unit);
                });

                if ( !matchingGroupFound ) {
                    var expenseDueOn = moment(expense.model.dueOn);
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
        };

        /**
         * Populate expense with matching group
         */
        this.populateExpenseWithMatchingGroup = function (expense, reverseOrder) {
            return this.populateExpensesWithMatchingGroups([expense], reverseOrder);
        };

    });

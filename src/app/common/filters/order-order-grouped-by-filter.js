angular
    .module('common')
    .filter('groupExpenses', function ($parse, filterWatcher) {
        return function (expenses, reverse) {

            var isObject = angular.isObject,
                forEach = angular.forEach;

            if ( !isObject(expenses) ) {
                return expenses;
            }

            return filterWatcher.isMemoized('groupBy', arguments) ||
                filterWatcher.memoize('groupBy', arguments, this,
                    _groupBy(expenses));

            // ---
            // Group by expenses function.
            // ---

            function _groupBy(expenses) {
                var groupedExpenses = [];
                var matchingGroup;
                var matchingGroupName;

                forEach(expenses, function (expense) {
                    matchingGroup = expense.matchingGroup;
                    matchingGroupName = matchingGroup.name;

                    if ( !_.some(groupedExpenses, function (group) {
                            return group.name === matchingGroupName;
                        }) ) {
                        groupedExpenses.push({ name: matchingGroupName, matchingGroup: matchingGroup, values: [] });
                    }

                    _.find(groupedExpenses, function (group) {
                        return group.name === matchingGroupName;
                    }).values.push(expense);
                });

                // ---
                // Comparator to sort expenses.
                // ---

                function expensesSortComparator(a, b) {
                    // A less than B
                    if ( a.matchingGroup.diff.date < b.matchingGroup.diff.date )
                        return -1;
                    // A greater than B
                    if ( a.matchingGroup.diff.date > b.matchingGroup.diff.date )
                        return 1;
                    // A greater than B
                    if ( a.matchingGroup.name === 'Today' && b.matchingGroup.name === 'This month' ) {
                        return -1;
                    }
                    return 0;
                }

                // ---
                // Sort expenses - +-reversed.
                // ---

                groupedExpenses.sort(expensesSortComparator);

                if ( reverse ) {
                    groupedExpenses.reverse();
                }

                return groupedExpenses;
            }
        }
    });
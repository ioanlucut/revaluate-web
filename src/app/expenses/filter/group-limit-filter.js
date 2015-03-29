angular
    .module("expenses")
    .filter('groupLimit', function () {
        return function (inputGrouped, input, limit) {
            if ( limit > input.length )
                limit = input.length;
            else if ( limit < -input.length )
                limit = -input.length;

            // Should not exceed the limit
            var commonSumIndex = 0;
            var inputGroupedExpenses;
            var currentGroupIndex;

            // Remove every expense from grouped expenses which are more than the limit
            for ( var idx = 0; idx < inputGrouped.length; idx++ ) {
                inputGroupedExpenses = inputGrouped[idx].values;

                for ( currentGroupIndex = 0; currentGroupIndex < inputGroupedExpenses.length; currentGroupIndex++ ) {
                    commonSumIndex += 1;

                    if ( commonSumIndex > limit ) {
                        inputGroupedExpenses.splice(currentGroupIndex, 1);
                    }
                }
            }

            return inputGrouped;
        };
    });
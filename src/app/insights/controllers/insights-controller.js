/**
 * expenses controller.
 */
angular
    .module("insights")
    .controller("InsightsController", function ($scope, $rootScope, $timeout, Category, expenses, categories, MIXPANEL_EVENTS) {

        /**
         * Track event.
         */
        mixpanel.track(MIXPANEL_EVENTS.insightsPage);

        /**
         * Existing expenses.
         */
        $scope.expenses = expenses;
        $scope.categories = categories;

        var expensesGrouped = _.groupBy($scope.expenses, function (expense) {
            return expense.model.category.id;
        });

        var validCategories = _.map(_.keys(expensesGrouped), function (expenseGroupedItem) {
            return _.find($scope.categories, function (category) {
                return category.model.id === parseInt(expenseGroupedItem, 10);
            })
        });

        var total = [];
        _.each(validCategories, function (category) {
            total.push(_.filter($scope.expenses, function (expense) {
                return expense.model.category.id === category.model.id;
            }));
        });

        $scope.expenseData = [];
        _.each(total, function (totalEntry) {
            if ( totalEntry.length === 1 ) {
                $scope.expenseData.push(totalEntry[0].model.value);
            }
            else {

                $scope.expenseData.push(_.reduce(totalEntry, function (element, total) {
                    return total.model.value + element.model.value;
                }))
            }
        });

        $scope.expenseLabels = [];
        _.each(validCategories, function (category) {
            return $scope.expenseLabels.push(category.model.name);
        });

        $scope.expenseColors = _.map(validCategories, function (category) {
            return category.model.color;
        });

        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
    });